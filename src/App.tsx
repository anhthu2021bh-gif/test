/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  Square, 
  Play, 
  Search, 
  Sliders, 
  Code, 
  RotateCcw, 
  Sparkles, 
  Check, 
  HelpCircle,
  Headphones,
  Award,
  Layers,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { AI_TERMS, AITerm } from './data/aiTerms';
import { speechEngine, SpeechOptions } from './utils/speech';
import { HtmlExportModal } from './components/HtmlExportModal';
import { DictionaryModal } from './components/DictionaryModal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<number | null>(null);
  const [playingType, setPlayingType] = useState<'term' | 'slow' | 'example' | null>(null);
  const [isAutoTourPlaying, setIsAutoTourPlaying] = useState(false);
  const [autoTourIndex, setAutoTourIndex] = useState<number>(-1);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedDictionaryTerm, setSelectedDictionaryTerm] = useState<AITerm | null>(null);
  const [isDictionaryModalOpen, setIsDictionaryModalOpen] = useState(false);

  // Audio configuration settings
  const [pitch, setPitch] = useState<number>(0.78); // Tone trầm chuẩn (0.78)
  const [rate, setRate] = useState<number>(0.86);   // Tốc độ phát âm chuẩn mực
  const [detectedVoiceName, setDetectedVoiceName] = useState<string>('');

  const autoTourTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update voice detection info
  useEffect(() => {
    const updateVoice = () => {
      const v = speechEngine.getBestBritishVoice();
      if (v) {
        setDetectedVoiceName(v.name);
      }
    };

    updateVoice();
    const unsubscribe = speechEngine.subscribe(updateVoice);
    return () => unsubscribe();
  }, []);

  // Filter terms
  const categories = ['Tất cả', 'Cốt lõi', 'Học sâu', 'Mô hình', 'Ứng dụng', 'Kỹ thuật'];

  const filteredTerms = AI_TERMS.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vietnamese.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.exampleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definitionVi.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'Tất cả' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Stop any audio when unmounting
  useEffect(() => {
    return () => {
      speechEngine.stop();
      if (autoTourTimeoutRef.current) clearTimeout(autoTourTimeoutRef.current);
    };
  }, []);

  // Play audio function for a term or example
  const handlePlay = (
    item: AITerm,
    type: 'term' | 'slow' | 'example',
    customRate?: number
  ) => {
    // If auto tour is running, stop it
    if (isAutoTourPlaying) {
      stopAutoTour();
    }

    speechEngine.stop();

    const textToSpeak = type === 'example' ? item.exampleEn : item.term;
    const effectiveRate = customRate ?? (type === 'slow' ? 0.70 : rate);

    setCurrentlyPlayingId(item.id);
    setPlayingType(type);

    speechEngine.speak(
      textToSpeak,
      {
        pitch: pitch, // Giọng trầm theo yêu cầu
        rate: effectiveRate,
      },
      {
        onEnd: () => {
          setCurrentlyPlayingId(null);
          setPlayingType(null);
        },
        onError: () => {
          setCurrentlyPlayingId(null);
          setPlayingType(null);
        },
      }
    );
  };

  const handleStop = () => {
    speechEngine.stop();
    setCurrentlyPlayingId(null);
    setPlayingType(null);
    stopAutoTour();
  };

  // Test voice sample
  const handleTestVoice = () => {
    speechEngine.stop();
    setCurrentlyPlayingId(-99);
    speechEngine.speak(
      "Greetings! This is the British deep-tone pronunciation engine for Artificial Intelligence.",
      { pitch, rate },
      {
        onEnd: () => setCurrentlyPlayingId(null),
        onError: () => setCurrentlyPlayingId(null),
      }
    );
  };

  // Auto-play through all 15 terms
  const startAutoTour = () => {
    setIsAutoTourPlaying(true);
    playTourStep(0);
  };

  const playTourStep = (index: number) => {
    if (index >= AI_TERMS.length) {
      setIsAutoTourPlaying(false);
      setAutoTourIndex(-1);
      setCurrentlyPlayingId(null);
      return;
    }

    const currentItem = AI_TERMS[index];
    setAutoTourIndex(index);
    setCurrentlyPlayingId(currentItem.id);
    setPlayingType('term');

    speechEngine.speak(
      currentItem.term,
      { pitch, rate },
      {
        onEnd: () => {
          autoTourTimeoutRef.current = setTimeout(() => {
            playTourStep(index + 1);
          }, 900);
        },
        onError: () => {
          setIsAutoTourPlaying(false);
          setAutoTourIndex(-1);
          setCurrentlyPlayingId(null);
        },
      }
    );
  };

  const stopAutoTour = () => {
    setIsAutoTourPlaying(false);
    setAutoTourIndex(-1);
    if (autoTourTimeoutRef.current) {
      clearTimeout(autoTourTimeoutRef.current);
      autoTourTimeoutRef.current = null;
    }
    speechEngine.stop();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-white">
      {/* Top Bar / Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold text-sm">
                  AI
                </div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  15 Thuật Ngữ AI & Phát Âm Chuẩn Anh-Anh
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Bảng 3 cột: Thuật ngữ tiếng Anh · Nút loa <span className="text-sky-300 font-semibold">🔊</span> giọng Anh - Anh tone trầm · Ví dụ thực tế
              </p>
            </div>

            {/* Top action buttons */}
            <div className="flex items-center flex-wrap gap-2.5">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  showSettings
                    ? 'bg-sky-500/15 text-sky-300 border-sky-500/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Cài đặt tone trầm & giọng</span>
              </button>

              <button
                onClick={() => {
                  const termToShow = filteredTerms[0] || AI_TERMS[0];
                  setSelectedDictionaryTerm(termToShow);
                  setIsDictionaryModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors"
                title="Mở gợi ý từ điển học thuật & từ vựng liên quan"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Gợi ý từ điển</span>
              </button>

              <button
                onClick={handleTestVoice}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                title="Bấm để kiểm tra âm thanh loa và giọng Anh-Anh tone trầm"
              >
                <Headphones className="w-3.5 h-3.5 text-sky-400" />
                <span>Thử loa 🔊</span>
              </button>

              <button
                onClick={() => setIsExportModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-sm shadow-sky-950 transition-all"
                title="Xem và sao chép mã nguồn HTML nguyên bản để đưa lên web"
              >
                <Code className="w-3.5 h-3.5" />
                <span>Xuất mã HTML</span>
              </button>
            </div>
          </div>

          {/* Quick Voice & Audio Specs Bar */}
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-sky-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Web Speech API: en-GB (Anh - Anh)
              </span>
              <span className="text-slate-600">·</span>
              <span>Tone trầm: <strong className="text-slate-200">Pitch {pitch.toFixed(2)}</strong></span>
              <span className="text-slate-600">·</span>
              <span>Tốc độ: <strong className="text-slate-200">{rate.toFixed(2)}x</strong></span>
              {detectedVoiceName && (
                <>
                  <span className="text-slate-600">·</span>
                  <span className="truncate max-w-[200px]" title={detectedVoiceName}>
                    Voice: {detectedVoiceName}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              {isAutoTourPlaying ? (
                <button
                  onClick={stopAutoTour}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-rose-600/20 text-rose-300 border border-rose-500/30 text-xs font-medium hover:bg-rose-600/30"
                >
                  <Square className="w-3 h-3 fill-current" />
                  <span>Dừng nghe tự động ({autoTourIndex + 1}/15)</span>
                </button>
              ) : (
                <button
                  onClick={startAutoTour}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium hover:bg-slate-700 hover:text-white"
                >
                  <Play className="w-3 h-3 fill-current text-sky-400" />
                  <span>Nghe toàn bộ 15 từ liên tục</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Expandable Settings Panel */}
      {showSettings && (
        <div className="border-b border-slate-800 bg-slate-900/90 px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-sky-400" />
                <span>Hiệu Chỉnh Ngữ Điệu Tone Trầm & Tốc Độ Phát Âm</span>
              </h2>
              <button
                onClick={() => {
                  setPitch(0.78);
                  setRate(0.86);
                }}
                className="text-xs text-slate-400 hover:text-sky-400 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Khôi phục mặc định (0.78 trầm chuẩn)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              {/* Pitch control */}
              <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-medium text-slate-300">Cao độ (Pitch - Tone trầm):</span>
                  <span className="font-bold text-sky-400">{pitch.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.1"
                  step="0.02"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>0.50 (Cực trầm)</span>
                  <span className="text-sky-400 font-semibold">0.78 (Trầm chuẩn yêu cầu)</span>
                  <span>1.00 (Bình thường)</span>
                </div>
              </div>

              {/* Rate control */}
              <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-medium text-slate-300">Tốc độ đọc (Rate):</span>
                  <span className="font-bold text-sky-400">{rate.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.2"
                  step="0.02"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>0.60x (Rất chậm)</span>
                  <span className="text-sky-400 font-semibold">0.86x (Rõ ràng chuẩn mực)</span>
                  <span>1.20x (Nhanh)</span>
                </div>
              </div>

              {/* Voice explanation & test */}
              <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="font-medium text-slate-300 mb-1">Mã hóa chuẩn Anh - Anh:</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Hệ thống tự động kích hoạt engine giọng <code className="text-sky-300">en-GB</code> của trình duyệt (Daniel / George / Google UK Male), kết hợp hạ độ cao tần số âm thanh tạo nên âm sắc trầm ấm đặc trưng.
                  </p>
                </div>
                <button
                  onClick={handleTestVoice}
                  className="mt-2 w-full py-1.5 rounded bg-sky-600/30 hover:bg-sky-600/50 text-sky-200 border border-sky-500/30 font-medium transition-colors"
                >
                  🔊 Bấm để nghe thử tone giọng trầm hiện tại
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm thuật ngữ, phiên âm, ý nghĩa tiếng Việt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* BẢNG 3 CỘT CHÍNH THEO ĐÚNG YÊU CẦU */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl shadow-black/40">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-950/80 border-b border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {/* CỘT 1 */}
                  <th scope="col" className="py-4 px-6 w-[35%] min-w-[280px]">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center text-[10px] text-slate-300 font-bold">1</span>
                      <span>Từ (Thuật ngữ) Tiếng Anh</span>
                    </div>
                  </th>

                  {/* CỘT 2 */}
                  <th scope="col" className="py-4 px-6 w-[20%] min-w-[190px] text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-5 h-5 rounded bg-sky-950 text-sky-400 border border-sky-800 flex items-center justify-center text-[10px] font-bold">2</span>
                      <span className="text-sky-300 flex items-center gap-1">
                        Phát Âm <span className="text-base">🔊</span> (Anh - Anh)
                      </span>
                    </div>
                  </th>

                  {/* CỘT 3 */}
                  <th scope="col" className="py-4 px-6 w-[45%] min-w-[340px]">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center text-[10px] text-slate-300 font-bold">3</span>
                      <span>Ví dụ cho câu cho từ đó</span>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/80 text-sm">
                {filteredTerms.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-12 text-center text-slate-400">
                      Không tìm thấy thuật ngữ phù hợp với "{searchQuery}"
                    </td>
                  </tr>
                ) : (
                  filteredTerms.map((item) => {
                    const isCurrentTermPlaying =
                      currentlyPlayingId === item.id && playingType === 'term';
                    const isSlowPlaying =
                      currentlyPlayingId === item.id && playingType === 'slow';
                    const isExamplePlaying =
                      currentlyPlayingId === item.id && playingType === 'example';
                    const isAnyActive =
                      isCurrentTermPlaying || isSlowPlaying || isExamplePlaying;

                    return (
                      <tr
                        key={item.id}
                        className={`transition-colors ${
                          isAnyActive
                            ? 'bg-sky-950/30'
                            : 'hover:bg-slate-800/40'
                        }`}
                      >
                        {/* ============================================================ */}
                        {/* CỘT 1: TỪ (THUẬT NGỮ) BẰNG TIẾNG ANH                         */}
                        {/* ============================================================ */}
                        <td className="py-5 px-6 align-top">
                          <div className="flex items-start gap-3">
                            <span className="text-xs font-mono text-slate-500 mt-1 select-none w-5">
                              #{item.id}
                            </span>
                            <div className="flex-1 min-w-0">
                              {/* Tên thuật ngữ tiếng Anh */}
                              <div className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                                <span>{item.term}</span>
                              </div>

                              {/* Phiên âm quốc tế IPA (Anh-Anh) */}
                              <div className="text-xs font-mono text-sky-400 mt-0.5 tracking-wide bg-sky-950/40 inline-block px-1.5 py-0.5 rounded border border-sky-800/40">
                                {item.ipa}
                              </div>

                              {/* Tên tiếng Việt */}
                              <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-2">
                                {item.vietnamese}
                              </div>

                              {/* Giải thích khái niệm chuyên môn */}
                              <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                                {item.definitionVi}
                              </div>

                              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                                <button
                                  onClick={() => {
                                    setSelectedDictionaryTerm(item);
                                    setIsDictionaryModalOpen(true);
                                  }}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-sky-950 text-slate-300 hover:text-sky-300 border border-slate-700 hover:border-sky-600 text-xs font-medium transition-colors"
                                  title={`Xem gợi ý từ điển, collocations và thuật ngữ liên quan cho ${item.term}`}
                                >
                                  <BookOpen className="w-3 h-3 text-amber-400" />
                                  <span>Gợi ý từ điển</span>
                                </button>
                                <span className="text-[11px] text-slate-500">
                                  Chuyên đề: {item.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* ============================================================ */}
                        {/* CỘT 2: NÚT LOA PHÁT ÂM ICON 🔊 - GIỌNG ANH-ANH, TONE TRẦM   */}
                        {/* ============================================================ */}
                        <td className="py-5 px-6 align-top text-center">
                          <div className="flex flex-col items-center justify-center gap-2">
                            {/* Nút bấm chính có icon 🔊 */}
                            <button
                              onClick={() => {
                                if (isCurrentTermPlaying) {
                                  handleStop();
                                } else {
                                  handlePlay(item, 'term');
                                }
                              }}
                              className={`group relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md ${
                                isCurrentTermPlaying
                                  ? 'bg-emerald-600 text-white shadow-emerald-900/50 ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-900'
                                  : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-950/60 hover:shadow-sky-900/80 active:translate-y-0.5'
                              }`}
                              title="Bấm để nghe phát âm chuẩn giọng Anh - Anh (en-GB) với tone trầm ấm"
                            >
                              {/* Icon 🔊 theo đúng yêu cầu */}
                              <span className="text-lg leading-none select-none">
                                🔊
                              </span>

                              <span>
                                {isCurrentTermPlaying ? 'Đang đọc...' : 'Phát âm'}
                              </span>

                              {/* Animated Audio Waves khi đang phát âm */}
                              {isCurrentTermPlaying && (
                                <span className="inline-flex items-end gap-0.5 h-3 ml-1">
                                  <span className="w-1 bg-white rounded-full h-full animate-[bounce_0.6s_infinite_ease-in-out]"></span>
                                  <span className="w-1 bg-white rounded-full h-2/3 animate-[bounce_0.6s_infinite_0.15s_ease-in-out]"></span>
                                  <span className="w-1 bg-white rounded-full h-full animate-[bounce_0.6s_infinite_0.3s_ease-in-out]"></span>
                                </span>
                              )}
                            </button>

                            {/* Nút phụ: Nghe chậm 0.7x */}
                            <button
                              onClick={() => {
                                if (isSlowPlaying) {
                                  handleStop();
                                } else {
                                  handlePlay(item, 'slow', 0.70);
                                }
                              }}
                              className={`text-[11px] px-2.5 py-1 rounded border transition-colors ${
                                isSlowPlaying
                                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                                  : 'text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 border-slate-700'
                              }`}
                              title="Nghe với tốc độ chậm 0.70x để luyện từng âm tiết chuẩn Anh - Anh"
                            >
                              {isSlowPlaying ? '🔊 Đang đọc chậm...' : '🐢 Nghe chậm (0.7x)'}
                            </button>

                            {/* Thông số kỹ thuật của âm thanh */}
                            <div className="text-[10px] text-slate-500 flex flex-col items-center">
                              <span className="text-sky-400/90 font-mono font-medium">en-GB · Pitch {pitch.toFixed(2)}</span>
                              <span>Tone giọng trầm</span>
                            </div>
                          </div>
                        </td>

                        {/* ============================================================ */}
                        {/* CỘT 3: VÍ DỤ CHO CÂU CHO TỪ ĐÓ                               */}
                        {/* ============================================================ */}
                        <td className="py-5 px-6 align-top">
                          <div className="space-y-2.5">
                            {/* Câu ví dụ tiếng Anh */}
                            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-slate-200 leading-relaxed text-sm">
                              <div className="flex items-start justify-between gap-3">
                                <p className="font-medium italic">
                                  "{item.exampleEn}"
                                </p>
                                
                                {/* Nút nghe câu ví dụ */}
                                <button
                                  onClick={() => {
                                    if (isExamplePlaying) {
                                      handleStop();
                                    } else {
                                      handlePlay(item, 'example');
                                    }
                                  }}
                                  className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                                    isExamplePlaying
                                      ? 'bg-emerald-600/30 text-emerald-200 border-emerald-500'
                                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700 hover:text-white'
                                  }`}
                                  title="Nghe phát âm cả câu ví dụ bằng giọng Anh-Anh tone trầm"
                                >
                                  <span>🔊</span>
                                  <span>{isExamplePlaying ? 'Đang đọc...' : 'Nghe câu'}</span>
                                </button>
                              </div>
                            </div>

                            {/* Dịch nghĩa tiếng Việt câu ví dụ */}
                            <div className="text-xs text-slate-400 pl-2 border-l-2 border-sky-500/50 leading-relaxed">
                              <span className="font-semibold text-slate-300">Dịch nghĩa: </span>
                              <span>{item.exampleVi}</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Feature Explanatory Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm mb-2">
              <Headphones className="w-4 h-4" />
              <span>Chuẩn Giọng Anh - Anh (RP / en-GB)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ngôn ngữ phát âm được cố định <code className="text-sky-300">en-GB</code>. Trọng âm chuẩn xác theo Từ điển Cambridge/Oxford với ngữ điệu Received Pronunciation rõ ràng.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm mb-2">
              <Volume2 className="w-4 h-4" />
              <span>Tone Giọng Trầm (Deep Tone Pitch)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cao độ được hạ xuống mức <strong>Pitch 0.78</strong> (dưới mức trung tính 1.0) để tạo âm trầm ấm, đĩnh đạc và uy quyền chuẩn phong thái chuyên gia AI học thuật.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm mb-2">
              <Code className="w-4 h-4" />
              <span>Sẵn Sàng Đưa Lên HTML Độc Lập</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bấm nút <strong>"Xuất mã HTML"</strong> ở góc trên để sao chép toàn bộ code HTML + CSS + JS thuần, hoạt động độc lập không cần server hay framework.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Chuyên mục Từ vựng Chuyên ngành Trí tuệ Nhân tạo (AI Terminology)</span>
          <span>15 Thuật ngữ Cốt lõi · Phát âm Web Speech API (en-GB Deep Pitch)</span>
        </div>
      </footer>

      {/* HTML Export Modal */}
      <HtmlExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

      {/* Dictionary Suggestions Modal */}
      <DictionaryModal
        term={selectedDictionaryTerm}
        isOpen={isDictionaryModalOpen}
        onClose={() => setIsDictionaryModalOpen(false)}
        onSelectRelatedTerm={(relatedName) => {
          const match = AI_TERMS.find(
            (t) => t.term.toLowerCase() === relatedName.toLowerCase()
          );
          if (match) {
            setSelectedDictionaryTerm(match);
          }
        }}
        pitch={pitch}
        rate={rate}
      />
    </div>
  );
}
