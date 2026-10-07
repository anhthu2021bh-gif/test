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
            <div class="term-actions">
              <button class="dict-btn" onclick="openDictModal(${item.id})" title="Xem gợi ý từ điển học thuật, collocations và từ liên quan">
                📖 Gợi ý từ điển
              </button>
              <span class="category-tag">Chuyên đề: ${item.category}</span>
            </div>
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
            <button class="slow-btn" onclick="playAudio('${item.term.replace(/'/g, "\\'")}', this, 0.70)" title="Nghe chậm để luyện phát âm">
              🐢 Nghe chậm (0.7x)
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

  const termsJson = JSON.stringify(AI_TERMS);

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bảng 15 Thuật Ngữ AI - Phát Âm Chuẩn Anh-Anh (Tone Trầm)</title>
  <style>
    :root {
      --bg: #0b1120;
      --card-bg: #1e293b;
      --border: #334155;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --accent: #38bdf8;
      --accent-hover: #0284c7;
      --audio-btn-bg: #0284c7;
      --audio-btn-hover: #0369a1;
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
      padding: 24px 16px;
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
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    h1 {
      font-size: 24px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.01em;
    }

    p.subtitle {
      color: var(--text-muted);
      font-size: 14px;
    }

    .audio-notice {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: 6px;
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
      border-radius: 10px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }

    th {
      background: #0f172a;
      color: #94a3b8;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 14px 18px;
      border-bottom: 1px solid var(--border);
    }

    td {
      padding: 18px 18px;
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
      width: 35%;
      min-width: 260px;
    }

    .term-en {
      font-size: 17px;
      font-weight: 700;
      color: #ffffff;
    }

    .term-ipa {
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 12px;
      color: #38bdf8;
      margin: 2px 0 4px 0;
      background: rgba(56, 189, 248, 0.1);
      display: inline-block;
      padding: 2px 6px;
      border-radius: 4px;
    }

    .term-vi {
      font-size: 14px;
      font-weight: 600;
      color: #e2e8f0;
      margin-top: 4px;
    }

    .term-def {
      font-size: 12px;
      color: #94a3b8;
      margin-top: 4px;
      line-height: 1.4;
    }

    .term-actions {
      margin-top: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .dict-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: #1e293b;
      color: #f59e0b;
      border: 1px solid #d97706;
      border-radius: 5px;
      padding: 3px 8px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .dict-btn:hover {
      background: #78350f;
      color: #fef3c7;
    }

    .category-tag {
      font-size: 11px;
      color: #64748b;
    }

    /* CỘT 2: PHÁT ÂM ICON 🔊 */
    .col-audio {
      width: 20%;
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
      border: 1px solid #38bdf8;
      padding: 9px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
      box-shadow: 0 2px 8px rgba(2, 132, 199, 0.4);
    }

    .audio-btn:hover {
      background: var(--audio-btn-hover);
      transform: translateY(-1px);
    }

    .audio-btn:active {
      transform: translateY(1px);
    }

    .audio-btn .speaker-icon {
      font-size: 16px;
    }

    .slow-btn {
      background: #1e293b;
      border: 1px solid #475569;
      color: #cbd5e1;
      padding: 3px 8px;
      font-size: 11px;
      border-radius: 5px;
      cursor: pointer;
    }

    .slow-btn:hover {
      background: #334155;
      color: #ffffff;
    }

    .audio-badge {
      font-size: 10px;
      color: #94a3b8;
    }

    /* Hiệu ứng sóng âm */
    .sound-wave {
      display: none;
      align-items: center;
      gap: 2px;
      height: 12px;
    }

    .sound-wave span {
      width: 2.5px;
      height: 100%;
      background: #ffffff;
      animation: wave 0.8s infinite ease-in-out;
    }

    .sound-wave span:nth-child(2) { animation-delay: 0.2s; }
    .sound-wave span:nth-child(3) { animation-delay: 0.4s; }

    .audio-btn.playing {
      background: #059669;
      border-color: #10b981;
    }

    .audio-btn.playing .sound-wave {
      display: inline-flex;
    }

    @keyframes wave {
      0%, 100% { height: 3px; }
      50% { height: 12px; }
    }

    /* CỘT 3: VÍ DỤ CÂU */
    .col-example {
      width: 45%;
      min-width: 300px;
    }

    .example-en {
      font-size: 13.5px;
      color: #f1f5f9;
      font-style: italic;
      line-height: 1.5;
      margin-bottom: 6px;
      background: rgba(15, 23, 42, 0.6);
      padding: 8px 12px;
      border-radius: 6px;
      border: 1px solid rgba(51, 65, 85, 0.7);
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
      font-size: 12.5px;
      color: #94a3b8;
      line-height: 1.4;
      padding-left: 6px;
      border-left: 2px solid #0284c7;
    }

    /* POPUP GỢI Ý TỪ ĐIỂN */
    .modal-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      z-index: 100;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    .modal-card {
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 12px;
      max-width: 620px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5);
    }

    .modal-header {
      padding: 16px 20px;
      border-bottom: 1px solid #334155;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1e293b;
    }

    .modal-header h3 {
      font-size: 18px;
      color: #ffffff;
    }

    .close-btn {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 20px;
      cursor: pointer;
      padding: 4px 8px;
    }

    .close-btn:hover { color: #ffffff; }

    .modal-body {
      padding: 20px;
      font-size: 13.5px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .modal-section-title {
      font-size: 12px;
      text-transform: uppercase;
      color: #94a3b8;
      font-weight: 700;
      letter-spacing: 0.05em;
      margin-bottom: 6px;
    }

    .collocation-item {
      background: #1e293b;
      padding: 8px 12px;
      border-radius: 6px;
      margin-bottom: 6px;
      font-family: monospace;
      font-size: 12px;
      color: #38bdf8;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .related-btn {
      background: #1e293b;
      border: 1px solid #475569;
      color: #cbd5e1;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
      margin-right: 6px;
      margin-bottom: 6px;
    }

    .related-btn:hover {
      background: #0369a1;
      color: #ffffff;
      border-color: #38bdf8;
    }

    .modal-footer {
      padding: 12px 20px;
      border-top: 1px solid #334155;
      background: #1e293b;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
    }

    .modal-footer a {
      color: #38bdf8;
      text-decoration: none;
      margin-right: 12px;
    }

    .modal-footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>

  <div class="container">
    <header>
      <h1>Bảng 15 Thuật Ngữ AI (Trí Tuệ Nhân Tạo)</h1>
      <p class="subtitle">Bảng gồm 3 cột chuẩn: Thuật ngữ tiếng Anh · Nút phát âm loa 🔊 giọng Anh-Anh tone trầm · Ví dụ thực tế & Gợi ý từ điển học thuật.</p>
      <div class="audio-notice">
        <span>🔊</span>
        <span>Phát âm giọng Anh - Anh (en-GB), thiết lập cao độ trầm (Pitch = 0.78, Rate = 0.86) tạo ngữ điệu trầm ấm, chuẩn mực của chuyên gia.</span>
      </div>
    </header>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>1. Thuật ngữ tiếng Anh & Gợi ý từ điển</th>
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

  <!-- MODAL GỢI Ý TỪ ĐIỂN -->
  <div id="dict-modal" class="modal-backdrop">
    <div class="modal-card">
      <div class="modal-header">
        <div>
          <span style="font-size: 11px; color: #38bdf8;">Gợi Ý Từ Điển Học Thuật AI</span>
          <h3 id="modal-term-title">Machine Learning</h3>
        </div>
        <button class="close-btn" onclick="closeDictModal()">&times;</button>
      </div>

      <div class="modal-body">
        <div>
          <div class="modal-section-title">Phiên âm & Từ loại</div>
          <p><strong id="modal-ipa" style="color: #38bdf8; font-family: monospace;">/məˈʃiːn ˈlɜː.nɪŋ/</strong> · <span id="modal-pos" style="color: #cbd5e1;">Noun phrase</span></p>
        </div>

        <div>
          <div class="modal-section-title">Nghĩa tiếng Việt & Khái niệm</div>
          <p><strong id="modal-vietnamese" style="color: #ffffff;">Học máy</strong></p>
          <p id="modal-definition" style="color: #cbd5e1; margin-top: 4px;"></p>
        </div>

        <div>
          <div class="modal-section-title">Cụm từ hay gặp trong nghiên cứu (Academic Collocations)</div>
          <div id="modal-collocations"></div>
        </div>

        <div>
          <div class="modal-section-title">Gợi ý thuật ngữ AI liên quan</div>
          <div id="modal-related"></div>
        </div>

        <div style="background: rgba(15,23,42,0.6); padding: 10px; border-radius: 6px; border: 1px solid #334155;">
          <div class="modal-section-title" style="color: #f59e0b;">💡 Lưu ý phát âm từ điển (Oxford / Cambridge)</div>
          <p id="modal-note" style="color: #94a3b8; font-size: 12px;"></p>
        </div>
      </div>

      <div class="modal-footer">
        <div>
          <span>Tra cứu trực tuyến: </span>
          <a id="modal-cambridge" href="#" target="_blank">Cambridge Dictionary ↗</a>
          <a id="modal-oxford" href="#" target="_blank">Oxford Dictionary ↗</a>
        </div>
        <button class="slow-btn" onclick="closeDictModal()">Đóng</button>
      </div>
    </div>
  </div>

  <script>
    var termsData = ${termsJson};

    // Hàm phát âm tiếng Anh - Anh (en-GB) với Tone Trầm (Pitch 0.78)
    function playAudio(text, btnElement, customRate) {
      if (!('speechSynthesis' in window)) {
        alert('Trình duyệt của bạn chưa hỗ trợ Web Speech API.');
        return;
      }

      window.speechSynthesis.cancel();

      var utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      utterance.pitch = 0.78;  // Tone trầm
      utterance.rate = customRate || 0.86;

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
        utterance.onend = function() { btnElement.classList.remove('playing'); };
        utterance.onerror = function() { btnElement.classList.remove('playing'); };
      }

      window.speechSynthesis.speak(utterance);
    }

    // Modal Gợi ý từ điển
    function openDictModal(termId) {
      var item = termsData.find(function(t) { return t.id === termId; });
      if (!item) return;

      document.getElementById('modal-term-title').innerText = item.term;
      document.getElementById('modal-ipa').innerText = item.ipa;
      document.getElementById('modal-pos').innerText = item.partOfSpeech;
      document.getElementById('modal-vietnamese').innerText = item.vietnamese;
      document.getElementById('modal-definition').innerText = item.definitionVi;
      document.getElementById('modal-note').innerText = item.dictionaryNote;

      // Collocations
      var collocHtml = '';
      if (item.collocations) {
        item.collocations.forEach(function(c) {
          collocHtml += '<div class="collocation-item"><span>• ' + c + '</span><button class="small-play-btn" onclick="playAudio(\\'' + c.replace(/'/g, "\\'") + '\\', this)">🔊 Nghe</button></div>';
        });
      }
      document.getElementById('modal-collocations').innerHTML = collocHtml;

      // Related terms
      var relatedHtml = '';
      if (item.relatedTerms) {
        item.relatedTerms.forEach(function(r) {
          var matched = termsData.find(function(t) { return t.term.toLowerCase() === r.toLowerCase(); });
          var clickAction = matched ? 'openDictModal(' + matched.id + ')' : '';
          relatedHtml += '<button class="related-btn" onclick="' + clickAction + '">' + r + ' →</button>';
        });
      }
      document.getElementById('modal-related').innerHTML = relatedHtml;

      // External links
      document.getElementById('modal-cambridge').href = 'https://dictionary.cambridge.org/search/english/direct/?q=' + encodeURIComponent(item.term);
      document.getElementById('modal-oxford').href = 'https://www.oxfordlearnersdictionaries.com/search/english/direct/?q=' + encodeURIComponent(item.term);

      var modal = document.getElementById('dict-modal');
      modal.style.display = 'flex';
    }

    function closeDictModal() {
      document.getElementById('dict-modal').style.display = 'none';
    }

    window.onclick = function(event) {
      var modal = document.getElementById('dict-modal');
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };

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
