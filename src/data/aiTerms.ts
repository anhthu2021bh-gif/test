export interface AITerm {
  id: number;
  term: string;
  ipa: string; // British English IPA
  partOfSpeech: string;
  vietnamese: string;
  definitionVi: string;
  exampleEn: string;
  exampleVi: string;
  category: string;
  collocations: string[]; // Cụm từ hay gặp trong từ điển học thuật
  relatedTerms: string[];  // Thuật ngữ liên quan được gợi ý
  dictionaryNote: string;  // Gợi ý tra cứu chuyên sâu từ điển Oxford/Cambridge
}

export const AI_TERMS: AITerm[] = [
  {
    id: 1,
    term: "Machine Learning",
    ipa: "/məˈʃiːn ˈlɜː.nɪŋ/",
    partOfSpeech: "Noun phrase (Cụm danh từ không đếm được)",
    vietnamese: "Học máy",
    definitionVi: "Phương pháp cho phép máy tính tự học hỏi và cải thiện từ dữ liệu mà không cần lập trình cụ thể từng bước.",
    exampleEn: "Machine learning algorithms analyse customer behaviour to predict future purchasing trends.",
    exampleVi: "Các thuật toán học máy phân tích hành vi khách hàng để dự đoán xu hướng mua sắm trong tương lai.",
    category: "Cốt lõi",
    collocations: [
      "apply machine learning techniques",
      "train a machine learning model",
      "machine learning pipeline"
    ],
    relatedTerms: ["Deep Learning", "Supervised Learning", "Overfitting"],
    dictionaryNote: "Từ điển Oxford xếp vào nhóm Computing. Trọng âm rơi vào âm tiết thứ 2 của 'machine' (/məˈʃiːn/) và âm tiết thứ 1 của 'learning' (/ˈlɜː.nɪŋ/)."
  },
  {
    id: 2,
    term: "Deep Learning",
    ipa: "/diːp ˈlɜː.nɪŋ/",
    partOfSpeech: "Noun phrase (Cụm danh từ không đếm được)",
    vietnamese: "Học sâu",
    definitionVi: "Phân nhánh của học máy sử dụng mạng nơ-ron sâu nhiều tầng để mô phỏng cách não bộ con người xử lý thông tin.",
    exampleEn: "Deep learning has revolutionised speech recognition and autonomous vehicle navigation.",
    exampleVi: "Học sâu đã tạo ra cuộc cách mạng trong nhận dạng giọng nói và điều hướng xe tự hành.",
    category: "Học sâu",
    collocations: [
      "deep learning architecture",
      "deep neural representation",
      "implement deep learning frameworks"
    ],
    relatedTerms: ["Neural Network", "Transformer Architecture", "Computer Vision"],
    dictionaryNote: "Từ điển Cambridge định nghĩa: loại hình trí tuệ nhân tạo sử dụng mạng nhiều lớp (multi-layered networks) để bắt chước khả năng học tập của con người."
  },
  {
    id: 3,
    term: "Neural Network",
    ipa: "/ˈnjʊə.rəl ˈnet.wɜːk/",
    partOfSpeech: "Countable Noun (Danh từ đếm được)",
    vietnamese: "Mạng nơ-ron nhân tạo",
    definitionVi: "Hệ thống điện toán lấy cảm hứng từ mạng lưới tế bào thần kinh sinh học, gồm các nút liên kết với nhau.",
    exampleEn: "An artificial neural network can recognize intricate patterns within medical scans.",
    exampleVi: "Mạng nơ-ron nhân tạo có thể nhận diện các mẫu bệnh lý phức tạp trong kết quả quét y khoa.",
    category: "Học sâu",
    collocations: [
      "convolutional neural network (CNN)",
      "recurrent neural network (RNN)",
      "feedforward neural network"
    ],
    relatedTerms: ["Deep Learning", "Transformer Architecture", "Machine Learning"],
    dictionaryNote: "Trong tiếng Anh-Anh, từ 'neural' phát âm với âm /njʊə/ thanh lịch, khác với âm /nʊr/ trong tiếng Anh-Mỹ."
  },
  {
    id: 4,
    term: "Natural Language Processing",
    ipa: "/ˈnætʃ.ər.əl ˈlæŋ.ɡwɪdʒ ˈprəʊ.ses.ɪŋ/",
    partOfSpeech: "Noun phrase (Viết tắt: NLP)",
    vietnamese: "Xử lý ngôn ngữ tự nhiên",
    definitionVi: "Lĩnh vực AI giúp máy tính đọc, hiểu, diễn giải và tạo ra ngôn ngữ của con người.",
    exampleEn: "Natural language processing enables voice assistants to understand colloquial British phrases.",
    exampleVi: "Xử lý ngôn ngữ tự nhiên cho phép trợ lý ảo hiểu được các cụm từ thông dụng trong tiếng Anh-Anh.",
    category: "Ứng dụng",
    collocations: [
      "NLP pipeline",
      "semantic sentiment analysis",
      "named entity recognition (NER)"
    ],
    relatedTerms: ["Large Language Model", "Prompt Engineering", "Transformer Architecture"],
    dictionaryNote: "Từ 'processing' trong phát âm Anh-Anh chuẩn có nguyên âm đầu là /prəʊ/ (dài, tròn môi), khác với /prɑː/ trong Anh-Mỹ."
  },
  {
    id: 5,
    term: "Computer Vision",
    ipa: "/kəmˈpjuː.tə ˈvɪʒ.ən/",
    partOfSpeech: "Noun phrase (Cụm danh từ không đếm được)",
    vietnamese: "Thị giác máy tính",
    definitionVi: "Công nghệ huấn luyện máy tính trích xuất, phân tích và diễn giải hình ảnh, video từ thế giới thực.",
    exampleEn: "Computer vision detects facial expressions and monitors traffic flow across smart cities.",
    exampleVi: "Thị giác máy tính phát hiện biểu cảm khuôn mặt và theo dõi lưu lượng giao thông tại các đô thị thông minh.",
    category: "Ứng dụng",
    collocations: [
      "computer vision benchmark",
      "object detection and tracking",
      "optical character recognition"
    ],
    relatedTerms: ["Neural Network", "Deep Learning", "Generative AI"],
    dictionaryNote: "Từ 'vision' chứa âm hữu thanh /ʒ/ (/ˈvɪʒ.ən/). Lưu ý không phát âm nhầm thành /ʃ/ hay /z/."
  },
  {
    id: 6,
    term: "Large Language Model",
    ipa: "/lɑːdʒ ˈlæŋ.ɡwɪdʒ ˈmɒd.əl/",
    partOfSpeech: "Noun phrase (Viết tắt: LLM)",
    vietnamese: "Mô hình ngôn ngữ lớn",
    definitionVi: "Mô hình AI được huấn luyện trên lượng văn bản khổng lồ để hiểu ngữ cảnh và sản sinh ngôn ngữ tự nhiên.",
    exampleEn: "A modern large language model can draft complex technical documentation within seconds.",
    exampleVi: "Một mô hình ngôn ngữ lớn hiện đại có thể soạn thảo tài liệu kỹ thuật phức tạp chỉ trong vài giây.",
    category: "Mô hình",
    collocations: [
      "pre-trained language model",
      "LLM inference latency",
      "context window length"
    ],
    relatedTerms: ["Prompt Engineering", "Fine-Tuning", "Hallucination"],
    dictionaryNote: "Trong tiếng Anh-Anh (RP), nguyên âm của từ 'large' là nguyên âm dài /ɑː/ (không cuộn lưỡi chữ r như Anh-Mỹ)."
  },
  {
    id: 7,
    term: "Generative AI",
    ipa: "/ˈdʒen.ər.ə.tɪv eɪ aɪ/",
    partOfSpeech: "Noun phrase (Viết tắt: GenAI)",
    vietnamese: "Trí tuệ nhân tạo tạo sinh",
    definitionVi: "Hệ thống AI có khả năng sáng tạo ra nội dung mới như văn bản, hình ảnh, âm thanh và mã nguồn.",
    exampleEn: "Generative AI creates synthetic artwork and assists software engineers with code completion.",
    exampleVi: "AI tạo sinh tạo ra tác phẩm nghệ thuật kỹ thuật số và hỗ trợ kỹ sư phần mềm hoàn thiện mã nguồn.",
    category: "Mô hình",
    collocations: [
      "generative AI ecosystem",
      "multimodal generation",
      "synthetic media generation"
    ],
    relatedTerms: ["Large Language Model", "Transformer Architecture", "Hallucination"],
    dictionaryNote: "Từ 'generative' có trọng âm chính ở âm tiết đầu tiên: /ˈdʒen.ər.ə.tɪv/. Hậu tố '-ive' phát âm nhẹ thành /ɪv/."
  },
  {
    id: 8,
    term: "Reinforcement Learning",
    ipa: "/ˌriː.ɪnˈfɔːs.mənt ˈlɜː.nɪŋ/",
    partOfSpeech: "Noun phrase (Viết tắt: RL)",
    vietnamese: "Học tăng cường",
    definitionVi: "Kỹ thuật huấn luyện thuật toán đưa ra quyết định thông qua cơ chế thưởng và phạt trong môi trường động.",
    exampleEn: "AlphaGo utilised reinforcement learning to master the ancient game of Go against world champions.",
    exampleVi: "AlphaGo đã sử dụng học tăng cường để thuần thục môn cờ vây cổ xưa và đánh bại các nhà vô địch thế giới.",
    category: "Cốt lõi",
    collocations: [
      "reinforcement learning from human feedback (RLHF)",
      "reward policy function",
      "Markov decision process"
    ],
    relatedTerms: ["Supervised Learning", "Unsupervised Learning", "Machine Learning"],
    dictionaryNote: "Trọng âm phụ ở 'rein-' (/ˌriː/), trọng âm chính ở '-force-' (/ˈfɔːs/). 'Learning' có âm dài /ɜː/ chuẩn Anh-Anh."
  },
  {
    id: 9,
    term: "Supervised Learning",
    ipa: "/ˈsuː.pə.vaɪzd ˈlɜː.nɪŋ/",
    partOfSpeech: "Noun phrase (Cụm danh từ chuyên ngành)",
    vietnamese: "Học có giám sát",
    definitionVi: "Mô hình học tập từ tập dữ liệu huấn luyện đã được gán nhãn chính xác trước đó.",
    exampleEn: "Supervised learning relies on annotated training datasets to classify spam emails accurately.",
    exampleVi: "Học có giám sát dựa vào tập dữ liệu huấn luyện có nhãn để phân loại thư rác một cách chuẩn xác.",
    category: "Cốt lõi",
    collocations: [
      "labelled training set",
      "classification and regression",
      "ground truth annotations"
    ],
    relatedTerms: ["Unsupervised Learning", "Reinforcement Learning", "Machine Learning"],
    dictionaryNote: "Trong tiếng Anh-Anh chuẩn, 'supervised' có thể đọc là /ˈsuː.pə.vaɪzd/ hoặc /ˈsjuː.pə.vaɪzd/. Hậu tố '-ed' đọc là âm hữu thanh /d/."
  },
  {
    id: 10,
    term: "Unsupervised Learning",
    ipa: "/ˌʌnˈsuː.pə.vaɪzd ˈlɜː.nɪŋ/",
    partOfSpeech: "Noun phrase (Cụm danh từ chuyên ngành)",
    vietnamese: "Học không giám sát",
    definitionVi: "Thuật toán tìm kiếm các quy luật, cụm hoặc cấu trúc ẩn mà không cần dữ liệu gắn nhãn trước.",
    exampleEn: "Unsupervised learning discovers natural customer clusters without predefined category labels.",
    exampleVi: "Học không giám sát khám phá các nhóm khách hàng tự nhiên mà không cần nhãn danh mục định sẵn.",
    category: "Cốt lõi",
    collocations: [
      "clustering algorithms",
      "dimensionality reduction",
      "principal component analysis (PCA)"
    ],
    relatedTerms: ["Supervised Learning", "Machine Learning", "Neural Network"],
    dictionaryNote: "Tiền tố phủ định 'Un-' mang trọng âm phụ /ˌʌn/, giúp người nghe phân biệt dứt khoát với 'Supervised'."
  },
  {
    id: 11,
    term: "Hallucination",
    ipa: "/həˌluː.sɪˈneɪ.ʃən/",
    partOfSpeech: "Noun (Đếm được & không đếm được)",
    vietnamese: "Ảo giác AI (Hiện tượng bịa đặt thông tin)",
    definitionVi: "Hiện tượng mô hình AI đưa ra câu trả lời sai sự thật nhưng với giọng văn vô cùng tự tin và thuyết phục.",
    exampleEn: "Engineers implement retrieval systems to minimize model hallucination in scientific queries.",
    exampleVi: "Các kỹ sư triển khai hệ thống truy xuất thông tin nhằm giảm thiểu ảo giác của mô hình khi giải đáp khoa học.",
    category: "Kỹ thuật",
    collocations: [
      "factual hallucination rate",
      "hallucination mitigation techniques",
      "grounding to eliminate hallucinations"
    ],
    relatedTerms: ["Large Language Model", "Prompt Engineering", "Fine-Tuning"],
    dictionaryNote: "Từ điển Cambridge đã bổ sung nghĩa AI cho từ này: 'tình trạng hệ thống AI tạo ra thông tin hư cấu hoặc sai lệch nhưng có vẻ hợp lý'."
  },
  {
    id: 12,
    term: "Overfitting",
    ipa: "/ˌəʊ.vəˈfɪt.ɪŋ/",
    partOfSpeech: "Noun (Danh từ không đếm được)",
    vietnamese: "Hiện tượng quá khớp",
    definitionVi: "Khi mô hình học quá kỹ dữ liệu huấn luyện (kể cả nhiễu), dẫn đến khả năng dự đoán kém trên dữ liệu mới.",
    exampleEn: "Regularisation techniques prevent overfitting when training models on limited datasets.",
    exampleVi: "Các kỹ thuật chuẩn hóa giúp ngăn ngừa hiện tượng quá khớp khi huấn luyện mô hình trên tập dữ liệu nhỏ.",
    category: "Kỹ thuật",
    collocations: [
      "prevent overfitting via dropout",
      "cross-validation against overfitting",
      "overfitting to noise"
    ],
    relatedTerms: ["Machine Learning", "Supervised Learning", "Fine-Tuning"],
    dictionaryNote: "Ngược nghĩa là 'Underfitting' (thiếu khớp). Tiền tố 'Over-' trong tiếng Anh-Anh bắt đầu bằng nguyên âm đôi /əʊ/."
  },
  {
    id: 13,
    term: "Prompt Engineering",
    ipa: "/prɒmpt ˌen.dʒɪˈnɪə.rɪŋ/",
    partOfSpeech: "Noun phrase (Cụm danh từ mới của ngành AI)",
    vietnamese: "Kỹ nghệ gợi ý",
    definitionVi: "Nghệ thuật và phương pháp thiết kế câu lệnh đầu vào để mô hình AI sinh ra kết quả chính xác, tối ưu nhất.",
    exampleEn: "Prompt engineering requires crafting clear constraints and context to elicit reliable responses.",
    exampleVi: "Kỹ nghệ gợi ý đòi hỏi việc xây dựng các ràng buộc và bối cảnh rõ ràng nhằm gợi mở câu trả lời đáng tin cậy.",
    category: "Kỹ thuật",
    collocations: [
      "few-shot prompt engineering",
      "chain-of-thought prompting",
      "system prompt optimization"
    ],
    relatedTerms: ["Large Language Model", "Generative AI", "Fine-Tuning"],
    dictionaryNote: "Từ 'prompt' trong tiếng Anh-Anh phát âm âm ngắn tròn môi /ɒ/ (/prɒmpt/), trọng âm rơi mạnh vào âm tiết đầu."
  },
  {
    id: 14,
    term: "Fine-Tuning",
    ipa: "/faɪn ˈtjuː.nɪŋ/",
    partOfSpeech: "Noun / Verb participle",
    vietnamese: "Tinh chỉnh mô hình",
    definitionVi: "Quá trình lấy mô hình nền tảng đã qua huấn luyện trước rồi huấn luyện tiếp trên tập dữ liệu chuyên biệt.",
    exampleEn: "Fine-tuning an open-source model with legal documents tailors it for contract analysis.",
    exampleVi: "Tinh chỉnh một mô hình mã nguồn mở bằng tài liệu pháp lý giúp tối ưu hóa nó cho việc phân tích hợp đồng.",
    category: "Kỹ thuật",
    collocations: [
      "parameter-efficient fine-tuning (PEFT)",
      "instruction fine-tuning",
      "fine-tuning domain adaptation"
    ],
    relatedTerms: ["Prompt Engineering", "Large Language Model", "Overfitting"],
    dictionaryNote: "Trong tiếng Anh-Anh, từ 'tuning' đọc là /ˈtjuː.nɪŋ/ với âm /juː/, trong khi tiếng Anh-Mỹ thường nuốt thành /ˈtuː.nɪŋ/."
  },
  {
    id: 15,
    term: "Transformer Architecture",
    ipa: "/trænsˈfɔː.mə ˈɑː.kɪ.tek.tʃə/",
    partOfSpeech: "Noun phrase (Cụm danh từ chuyên ngành)",
    vietnamese: "Kiến trúc Transformer",
    definitionVi: "Kiến trúc mạng nơ-ron dựa trên cơ chế tự chú ý (self-attention), nền tảng của hầu hết các mô hình LLM hiện nay.",
    exampleEn: "The transformer architecture enables models to weigh the relevance of words across entire paragraphs.",
    exampleVi: "Kiến trúc transformer cho phép các mô hình cân nhắc mức độ liên quan giữa các từ xuyên suốt cả đoạn văn.",
    category: "Mô hình",
    collocations: [
      "self-attention mechanism",
      "encoder-decoder transformer",
      "multi-head attention layers"
    ],
    relatedTerms: ["Large Language Model", "Deep Learning", "Neural Network"],
    dictionaryNote: "Cả hai từ 'transformer' (/trænsˈfɔː.mə/) và 'architecture' (/ˈɑː.kɪ.tek.tʃə/) trong tiếng Anh-Anh đều có âm schwa /ə/ ở cuối mà không có âm /r/ đệm."
  }
];
