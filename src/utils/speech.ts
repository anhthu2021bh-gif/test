/**
 * Audio & Speech Synthesis Engine for British English (Tone trầm / Deep Tone)
 */

export interface SpeechOptions {
  pitch?: number; // 0.5 - 1.2 (default 0.78 for deep tone)
  rate?: number;  // 0.5 - 1.5 (default 0.85 for articulate, standard British pronunciation)
  volume?: number; // 0 - 1
  voiceURI?: string;
}

export interface BritishVoice {
  voice: SpeechSynthesisVoice;
  isBritish: boolean;
  isMaleOrDeep: boolean;
  name: string;
}

class SpeechEngine {
  private voices: SpeechSynthesisVoice[] = [];
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: Set<() => void> = new Set();
  private selectedVoiceURI: string | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
        this.notifyListeners();
      };
    }
  }

  private loadVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    this.voices = window.speechSynthesis.getVoices();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach((fn) => fn());
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (this.voices.length === 0 && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.voices = window.speechSynthesis.getVoices();
    }
    return this.voices;
  }

  /**
   * Finds the best British English voice, favoring male/deep timbre voices
   */
  public getBestBritishVoice(): SpeechSynthesisVoice | null {
    const all = this.getVoices();
    if (!all.length) return null;

    if (this.selectedVoiceURI) {
      const match = all.find((v) => v.voiceURI === this.selectedVoiceURI);
      if (match) return match;
    }

    // 1. British male / deep voices priority
    const britishMaleVoices = all.filter((v) => {
      const lang = v.lang.toLowerCase().replace('_', '-');
      const isGB = lang === 'en-gb' || lang.startsWith('en-gb');
      const name = v.name.toLowerCase();
      const isMale = name.includes('male') || name.includes('george') || name.includes('daniel') || name.includes('oliver') || name.includes('arthur');
      return isGB && isMale;
    });
    if (britishMaleVoices.length > 0) return britishMaleVoices[0];

    // 2. Any en-GB voice
    const anyBritish = all.filter((v) => {
      const lang = v.lang.toLowerCase().replace('_', '-');
      return lang === 'en-gb' || lang.startsWith('en-gb') || v.name.toLowerCase().includes('united kingdom') || v.name.toLowerCase().includes('uk english');
    });
    if (anyBritish.length > 0) return anyBritish[0];

    // 3. Any English voice
    const anyEnglish = all.filter((v) => v.lang.toLowerCase().startsWith('en'));
    if (anyEnglish.length > 0) return anyEnglish[0];

    return all[0] || null;
  }

  public setPreferredVoiceURI(uri: string) {
    this.selectedVoiceURI = uri;
  }

  /**
   * Speak text with British accent and deep pitch (tone trầm)
   */
  public speak(
    text: string,
    options: SpeechOptions = {},
    callbacks?: {
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (err: any) => void;
    }
  ): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      callbacks?.onError?.(new Error('Trình duyệt không hỗ trợ Web Speech API'));
      return false;
    }

    try {
      // Cancel ongoing speech to ensure immediate response
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const voice = this.getBestBritishVoice();

      if (voice) {
        utterance.voice = voice;
      }

      // Default tone: deep pitch (0.78), steady articulate rate (0.86)
      utterance.lang = voice?.lang || 'en-GB';
      utterance.pitch = options.pitch ?? 0.78; // Tone trầm: values below 1.0 produce deep/baritone pitch
      utterance.rate = options.rate ?? 0.86;   // Articulate pacing for accurate British pronunciation
      utterance.volume = options.volume ?? 1.0;

      utterance.onstart = () => {
        this.currentUtterance = utterance;
        callbacks?.onStart?.();
      };

      utterance.onend = () => {
        this.currentUtterance = null;
        callbacks?.onEnd?.();
      };

      utterance.onerror = (e) => {
        // 'interrupted' is normal when a user clicks another audio button
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          console.warn('SpeechSynthesis error:', e.error);
        }
        this.currentUtterance = null;
        callbacks?.onEnd?.();
      };

      // Workaround for some mobile/Chromium engines pausing unexpectedly
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (err) {
      console.error('Failed to trigger speech:', err);
      callbacks?.onError?.(err);
      return false;
    }
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking;
  }
}

export const speechEngine = new SpeechEngine();
