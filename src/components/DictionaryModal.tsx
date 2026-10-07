import React from 'react';
import { AITerm } from '../data/aiTerms';
import { 
  X, 
  BookOpen, 
  ExternalLink, 
  Volume2, 
  Tag, 
  Sparkles, 
  Layers, 
  Compass, 
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { speechEngine } from '../utils/speech';

interface Props {
  term: AITerm | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectRelatedTerm: (termName: string) => void;
  pitch: number;
  rate: number;
}

export const DictionaryModal: React.FC<Props> = ({
  term,
  isOpen,
  onClose,
  onSelectRelatedTerm,
  pitch,
  rate,
}) => {
  if (!isOpen || !term) return null;

  const handlePlaySound = (text: string) => {
    speechEngine.stop();
    speechEngine.speak(text, { pitch, rate });
  };

  const cambridgeSearchUrl = `https://dictionary.cambridge.org/search/english/direct/?q=${encodeURIComponent(
    term.term
  )}`;
  const oxfordSearchUrl = `https://www.oxfordlearnersdictionaries.com/search/english/direct/?q=${encodeURIComponent(
    term.term
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-sky-400">Gợi Ý Từ Điển Học Thuật AI</span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400">Mã #{term.id}</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">{term.term}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-300">
          {/* Phonetics & Audio Bar */}
          <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-semibold text-slate-400">Phiên âm Anh - Anh:</span>
                <span className="font-mono text-base font-bold text-sky-400">{term.ipa}</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Từ loại: <strong className="text-slate-200">{term.partOfSpeech}</strong>
              </div>
            </div>
            <button
              onClick={() => handlePlaySound(term.term)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs shadow-md transition-colors"
            >
              <span className="text-base leading-none">🔊</span>
              <span>Nghe phát âm tone trầm</span>
            </button>
          </div>

          {/* Nghĩa & Định nghĩa chuyên gia */}
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-sky-400" />
              <span>Nghĩa tiếng Việt & Khái niệm cốt lõi</span>
            </div>
            <div className="text-base font-semibold text-white mb-1">
              {term.vietnamese}
            </div>
            <p className="text-slate-300 leading-relaxed text-sm bg-slate-800/40 p-3 rounded-lg border border-slate-800/70">
              {term.definitionVi}
            </p>
          </div>

          {/* Gợi ý cụm từ chuyên ngành thường dùng (Collocations) */}
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Gợi ý cụm từ hay đi kèm (Academic Collocations)</span>
            </div>
            <div className="space-y-2">
              {term.collocations.map((colloc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <span className="font-mono text-xs text-slate-200 font-medium">
                    • {colloc}
                  </span>
                  <button
                    onClick={() => handlePlaySound(colloc)}
                    className="p-1 rounded text-slate-400 hover:text-sky-300 hover:bg-slate-800 text-xs inline-flex items-center gap-1"
                    title="Nghe phát âm cụm từ này"
                  >
                    <span>🔊</span>
                    <span className="text-[11px]">Nghe</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Gợi ý các thuật ngữ AI liên quan nên học tiếp */}
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Gợi ý các thuật ngữ AI liên quan nên tìm hiểu</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {term.relatedTerms.map((relatedName, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectRelatedTerm(relatedName)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-sky-950 hover:text-sky-300 border border-slate-700 hover:border-sky-700 transition-colors"
                >
                  <span>{relatedName}</span>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                </button>
              ))}
            </div>
          </div>

          {/* Lưu ý phát âm học thuật từ Oxford / Cambridge */}
          <div className="p-3.5 rounded-lg bg-slate-950/50 border border-slate-800 text-xs text-slate-400 space-y-1.5">
            <div className="font-semibold text-slate-200 flex items-center gap-1.5">
              <span>💡 Lưu ý ngữ âm từ điển:</span>
            </div>
            <p className="leading-relaxed">{term.dictionaryNote}</p>
          </div>
        </div>

        {/* Footer with external dictionary links */}
        <div className="px-6 py-3.5 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-slate-400">Tra cứu nhanh từ điển quốc tế:</span>
            <a
              href={cambridgeSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-medium hover:underline"
            >
              <span>Cambridge</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-600">·</span>
            <a
              href={oxfordSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-medium hover:underline"
            >
              <span>Oxford</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
