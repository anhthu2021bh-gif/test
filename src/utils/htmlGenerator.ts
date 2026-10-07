import { AI_TERMS } from '../data/aiTerms';

export function generateStandaloneHTML(): string {
  const rows = AI_TERMS.map(
    (item) => `
      <tr>
        <!-- CỘT 1: TỪ (THUẬT NGỮ) BẰNG TIẾNG ANH -->
        <td class="col-term">
          <div class="term-wrapper">
            <div class="term-en">${item.term}</div>
            <div class="term-ipa">${item.ipa}</div>
            <div class="term-vi">${item.vietnamese}</div>
            <div class="term-def">${item.definitionVi}</div>
          </div>
        </td>

        <!-- CỘT 2: NÚT LOA PHÁT ÂM ICON 🔊 (GIỌNG ANH-ANH, TONE TRẦM) -->
        <td class="col-audio">
          <div class="audio-control-cell">
            <button class="audio-btn" onclick="playAudio('${item.term.replace(/'/g, "\\'")}', this)" title="Nghe phát âm chuẩn giọng Anh - Anh (Tone trầm)">
              <span class="speaker-icon">🔊</span>
              <span class="btn-text">Phát âm</span>
              <span class="sound-wave">
                <span></span><span></span><span></span>
              </span>
            </button>
            <span class="audio-badge">en-GB · Trầm (Pitch 0.78)</span>
          </div>
        </td>

        <!-- CỘT 3: VÍ DỤ CÂU CHO TỪ ĐÓ -->
        <td class="col-example">
          <div class="example-wrapper">
            <div class="example-en">
              "${item.exampleEn}"
              <button class="small-play-btn" onclick="playAudio('${item.exampleEn.replace(/'/g, "\\'")}', this)" title="Nghe cả câu ví dụ">
                🔊 Nghe câu
              </button>
            </div>
            <div class="example-vi">
              👉 <em>${item.exampleVi}</em>
            </div>
          </div>
        </td>
      </tr>
    `
  ).join('');

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bảng 15 Thuật Ngữ AI - Phát Âm Chuẩn Anh-Anh (Tone Trầm)</title>
  <style>
    :root {
      --bg: #0f172a;
      --card-bg: #1e293b;
      --border: #334155;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --accent: #38bdf8;
      --accent-hover: #0284c7;
      --term-highlight: #38bdf8;
      --audio-btn-bg: #0369a1;
      --audio-btn-hover: #0284c7;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg);
      color: var(--text-main);
      padding: 24px;
      line-height: 1.5;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    header {
      margin-bottom: 24px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 20px;
    }

    h1 {
      font-size: 26px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 8px;
    }

    p.subtitle {
      color: var(--text-muted);
      font-size: 14px;
    }

    .audio-notice {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: 12px;
      padding: 8px 14px;
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.25);
      border-radius: 6px;
      font-size: 13px;
      color: #bae6fd;
    }

    /* BẢNG 3 CỘT */
    .table-container {
      overflow-x: auto;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }

    th {
      background: #111827;
      color: #94a3b8;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 14px 18px;
      border-bottom: 1px solid var(--border);
    }

    td {
      padding: 16px 18px;
      border-bottom: 1px solid rgba(51, 65, 85, 0.6);
      vertical-align: top;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover {
      background: rgba(51, 65, 85, 0.25);
    }

    /* CỘT 1: THUẬT NGỮ */
    .col-term {
      width: 32%;
      min-width: 240px;
    }

    .term-en {
      font-size: 17px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.01em;
    }

    .term-ipa {
      font-family: monospace;
      font-size: 13px;
      color: #38bdf8;
      margin: 2px 0 4px 0;
    }

    .term-vi {
      font-size: 14px;
      font-weight: 600;
      color: #cbd5e1;
    }

    .term-def {
      font-size: 12px;
      color: #94a3b8;
      margin-top: 4px;
      line-height: 1.4;
    }

    /* CỘT 2: PHÁT ÂM ICON 🔊 */
    .col-audio {
      width: 22%;
      min-width: 180px;
      text-align: center;
    }

    .audio-control-cell {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }

    .audio-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: var(--audio-btn-bg);
      color: #ffffff;
      border: 1px solid #0284c7;
      padding: 10px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
      box-shadow: 0 2px 8px rgba(3, 105, 161, 0.4);
    }

    .audio-btn:hover {
      background: var(--audio-btn-hover);
      transform: translateY(-1px);
    }

    .audio-btn:active {
      transform: translateY(1px);
    }

    .audio-btn .speaker-icon {
      font-size: 18px;
    }

    .audio-badge {
      font-size: 11px;
      color: #94a3b8;
    }

    /* Hiệu ứng sóng âm khi đang phát */
    .sound-wave {
      display: none;
      align-items: center;
      gap: 2px;
      height: 14px;
    }

    .sound-wave span {
      width: 3px;
      height: 100%;
      background: #ffffff;
      animation: wave 0.8s infinite ease-in-out;
    }

    .sound-wave span:nth-child(2) {
      animation-delay: 0.2s;
    }

    .sound-wave span:nth-child(3) {
      animation-delay: 0.4s;
    }

    .audio-btn.playing {
      background: #059669;
      border-color: #10b981;
    }

    .audio-btn.playing .sound-wave {
      display: inline-flex;
    }

    @keyframes wave {
      0%, 100% { height: 4px; }
      50% { height: 14px; }
    }

    /* CỘT 3: VÍ DỤ CÂU */
    .col-example {
      width: 46%;
      min-width: 300px;
    }

    .example-en {
      font-size: 14px;
      color: #f1f5f9;
      font-style: italic;
      line-height: 1.5;
      margin-bottom: 6px;
    }

    .small-play-btn {
      display: inline-flex;
      align-items: center;
      margin-left: 6px;
      padding: 2px 8px;
      font-size: 11px;
      font-style: normal;
      background: #334155;
      color: #e2e8f0;
      border: 1px solid #475569;
      border-radius: 4px;
      cursor: pointer;
    }

    .small-play-btn:hover {
      background: #475569;
    }

    .example-vi {
      font-size: 13px;
      color: #94a3b8;
      line-height: 1.4;
    }
  </style>
</head>
<body>

  <div class="container">
    <header>
      <h1>Bảng 15 Thuật Ngữ AI (Trí Tuệ Nhân Tạo)</h1>
      <p class="subtitle">Bảng gồm 3 cột chuẩn: Thuật ngữ tiếng Anh · Nút phát âm loa 🔊 giọng Anh-Anh tone trầm · Ví dụ thực tế.</p>
      <div class="audio-notice">
        <span>🔊</span>
        <span>Phát âm giọng Anh - Anh (en-GB), thiết lập cao độ trầm (Pitch = 0.78, Rate = 0.86) tạo ngữ điệu trầm ấm, chuẩn mực của chuyên gia.</span>
      </div>
    </header>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>1. Thuật ngữ tiếng Anh</th>
            <th style="text-align: center;">2. Phát âm (Icon 🔊)</th>
            <th>3. Ví dụ câu thực tế</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  </div>

  <script>
    // Hàm phát âm tiếng Anh - Anh (en-GB) với Tone Trầm (Pitch 0.78)
    function playAudio(text, btnElement) {
      if (!('speechSynthesis' in window)) {
        alert('Trình duyệt của bạn chưa hỗ trợ Web Speech API.');
        return;
      }

      window.speechSynthesis.cancel(); // Dừng câu trước đó nếu đang đọc

      var utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';  // Giọng Anh - Anh
      utterance.pitch = 0.78;    // Tone trầm ấm (giá trị < 1.0 tạo tone trầm)
      utterance.rate = 0.86;     // Tốc độ vừa phải, chuẩn xác từng âm tiết

      // Tìm kiếm giọng Anh - Anh nam hoặc trầm nếu có trong máy
      var voices = window.speechSynthesis.getVoices();
      var britishVoice = voices.find(function(v) {
        var lang = v.lang.toLowerCase().replace('_', '-');
        var isGB = lang === 'en-gb' || lang.startsWith('en-gb');
        var isMale = v.name.toLowerCase().indexOf('male') !== -1 || 
                     v.name.toLowerCase().indexOf('george') !== -1 ||
                     v.name.toLowerCase().indexOf('daniel') !== -1;
        return isGB && isMale;
      }) || voices.find(function(v) {
        var lang = v.lang.toLowerCase().replace('_', '-');
        return lang === 'en-gb' || lang.startsWith('en-gb');
      });

      if (britishVoice) {
        utterance.voice = britishVoice;
      }

      if (btnElement) {
        btnElement.classList.add('playing');
        utterance.onend = function() {
          btnElement.classList.remove('playing');
        };
        utterance.onerror = function() {
          btnElement.classList.remove('playing');
        };
      }

      window.speechSynthesis.speak(utterance);
    }

    // Tải trước danh sách voice của trình duyệt
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = function() {
        window.speechSynthesis.getVoices();
      };
    }
  </script>
</body>
</html>
`;
}
