import React, { useState } from 'react';
import { Copy, Check, Download, X, Code, FileText } from 'lucide-react';
import { generateStandaloneHTML } from '../utils/htmlGenerator';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const HtmlExportModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const htmlContent = generateStandaloneHTML();

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bang-15-thuat-ngu-ai-phat-am-anh-anh.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white">Mã HTML Thuần Hoàn Chỉnh (3 Cột Chuẩn)</h3>
              <p className="text-xs text-slate-400">
                Chứa đầy đủ cấu trúc bảng 3 cột, CSS giao diện và Javascript phát âm giọng Anh - Anh tone trầm
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <FileText className="w-4 h-4 text-sky-400" />
            <span>Đã tích hợp Web Speech API (en-GB, pitch 0.78 trầm, rate 0.86)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Đã sao chép mã!' : 'Sao chép mã HTML'}
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-sky-600 hover:bg-sky-500 text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Tải file .html về máy
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-auto p-4 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed selection:bg-sky-900 selection:text-white">
          <pre className="whitespace-pre-wrap">{htmlContent}</pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>💡 Bạn có thể lưu thành file <strong className="text-slate-200">index.html</strong> và mở trực tiếp bằng trình duyệt Chrome, Edge, Safari hoặc nhúng vào website.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
