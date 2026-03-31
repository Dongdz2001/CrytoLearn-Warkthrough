export const quizData = [
  // 1. Classic Ciphers (Easy)
  {
    difficulty: 'easy',
    category: 'Mã hóa Cổ điển',
    question: 'Thuật toán Caesar dịch chuyển ký tự "A" với khóa k=3 sẽ trở thành chữ cái nào?',
    options: ['C', 'D', 'B', 'E'],
    answer: 'D',
    explanation: 'A (0) + 3 = 3, tương ứng với chữ cái D (0=A, 1=B, 2=C, 3=D).'
  },
  {
    difficulty: 'easy',
    category: 'Mã hóa Cổ điển',
    question: 'Mật mã Atbash là dạng mật mã thay thế có đặc điểm gì nổi bật?',
    options: [
      'Sử dụng khóa là một từ tiếng Anh',
      'Đảo ngược bảng chữ cái (A↔Z, B↔Y)',
      'Dịch chuyển ký tự theo số bước ngẫu nhiên',
      'Sử dụng ma trận toán học phức tạp'
    ],
    answer: 'Đảo ngược bảng chữ cái (A↔Z, B↔Y)',
    explanation: 'Atbash là mật mã tự đối xứng, lấy chữ cái đầu thay cho chữ cái cuối và ngược lại.'
  },
  {
    difficulty: 'easy',
    category: 'Mã hóa Cổ điển',
    question: 'Tại sao mật mã Vigenère lại an toàn hơn mật mã Caesar?',
    options: [
      'Vì nó sử dụng máy tính để mã hóa',
      'Vì nó là mật mã thay thế đa biểu (polyalphabetic)',
      'Vì nó không thể bị giải mật nếu không có chìa khóa',
      'Vì nó sử dụng bảng chữ cái Hebrew'
    ],
    answer: 'Vì nó là mật mã thay thế đa biểu (polyalphabetic)',
    explanation: 'Vigenère sử dụng từ khóa để thay đổi khoảng cách dịch chuyển cho từng ký tự, chống lại phân tích tần suất đơn giản.'
  },
  {
    difficulty: 'easy',
    category: 'XOR & Logic',
    question: 'Phép toán XOR (1 ⊕ 0) cho kết quả là bao nhiêu?',
    options: ['0', '1', '2', 'Hệ thập lục phân'],
    answer: '1',
    explanation: 'Phép XOR trả về 1 nếu hai bit đầu vào khác nhau.'
  },
  {
    difficulty: 'easy',
    category: 'Mã hóa Cổ điển',
    question: 'Khóa k=1 trong mật mã Caesar biến "Z" thành chữ cái nào?',
    options: ['A', 'Y', 'B', 'X'],
    answer: 'A',
    explanation: 'Bảng chữ cái xoay vòng, sau Z là A.'
  },
  {
    difficulty: 'easy',
    category: 'Hoán vị',
    question: 'Phương pháp mã hóa Rail Fence sử dụng kỹ thuật nào?',
    options: ['Thay thế ký tự', 'Hoán vị vị trí ký tự', 'Mã hóa khóa công khai', 'Hàm băm'],
    answer: 'Hoán vị vị trí ký tự',
    explanation: 'Rail Fence sắp xếp lại vị trí các chữ cái theo hình zig-zag.'
  },
  {
    difficulty: 'easy',
    category: 'Lịch sử',
    question: 'Máy Enigma nổi tiếng được sử dụng trong cuộc chiến nào?',
    options: ['Thế chiến I', 'Thế chiến II', 'Chiến tranh lạnh', 'Chiến tranh Việt Nam'],
    answer: 'Thế chiến II',
    explanation: 'Enigma là máy mã hóa cơ điện của Đức trong Thế chiến II.'
  },
  {
    difficulty: 'easy',
    category: 'Cơ bản',
    question: 'Trong mật mã học, "Plaintext" nghĩa là gì?',
    options: ['Văn bản đã mã hóa', 'Văn bản gốc chưa mã hóa', 'Chìa khóa mã hóa', 'Thuật toán mã hóa'],
    answer: 'Văn bản gốc chưa mã hóa',
    explanation: 'Plaintext là dữ liệu ở dạng ban đầu, có thể đọc được trước khi áp dụng thuật toán mã hóa.'
  },
  {
    difficulty: 'easy',
    category: 'Cơ bản',
    question: 'Mật mã thay thế đơn giản (Substitution Cipher) thay thế cái gì?',
    options: ['Thay thế vị trí các chữ cái', 'Thay thế mỗi chữ cái bằng một chữ cái khác', 'Thay thế văn bản bằng hình ảnh', 'Thay thế từ bằng số'],
    answer: 'Thay thế mỗi chữ cái bằng một chữ cái khác',
    explanation: 'Đây là phương pháp thay thế từng đơn vị văn bản gốc bằng văn bản mã tương ứng.'
  },
  {
    difficulty: 'easy',
    category: 'XOR',
    question: 'Nếu A XOR B = C, thì A XOR C bằng bao nhiêu?',
    options: ['0', '1', 'B', 'A+C'],
    answer: 'B',
    explanation: 'Nhờ tính chất tự nghịch đảo: (A XOR B) XOR A = B.'
  },

  // 2. Medium Levels (Medium)
  {
    difficulty: 'medium',
    category: 'XOR & Logic',
    question: 'Tính chất nào của phép XOR cho phép nó vừa dùng để mã hóa vừa dùng để giải mã?',
    options: [
      'Tính chất giao hoán',
      'Tính chất tự nghịch đảo (A ⊕ B ⊕ B = A)',
      'Tính chất kết hợp',
      'Tính chất phân phối'
    ],
    answer: 'Tính chất tự nghịch đảo (A ⊕ B ⊕ B = A)',
    explanation: 'XOR hai lần với cùng một giá trị sẽ trả về giá trị ban đầu, giúp cấu trúc mã hóa và giải mã giống nhau.'
  },
  {
    difficulty: 'medium',
    category: 'Triple DES',
    question: 'Cấu trúc Mạng Feistel trong Triple DES có ưu điểm chính là gì?',
    options: [
      'Làm cho bản mã ngắn lại',
      'Cho phép sử dụng cùng một phần cứng cho cả mã hóa và giải mã',
      'Chống lại tấn công lượng tử',
      'Tự động tạo ra khóa bí mật'
    ],
    answer: 'Cho phép sử dụng cùng một phần cứng cho cả mã hóa và giải mã',
    explanation: 'Thiết kế Feistel cho phép quá trình giải mã chỉ là quá trình mã hóa chạy ngược lại với thứ tự khóa đảo chiều.'
  },
  {
    difficulty: 'medium',
    category: 'Triple DES',
    question: 'Tại sao Triple DES (3DES) lại sử dụng thuật toán DES 3 lần thay vì 1 lần?',
    options: [
      'Để làm cho dữ liệu đẹp hơn',
      'Để tăng kích thước khối dữ liệu',
      'Để kéo dài không gian khóa, chống lại tấn công vét cạn (Brute-force)',
      'Để tương thích với chuẩn SHA'
    ],
    answer: 'Để kéo dài không gian khóa, chống lại tấn công vét cạn (Brute-force)',
    explanation: '3DES sử dụng 3 khóa khác nhau (hoặc 2 khóa) để tăng độ phức tạp so với khóa 56-bit của DES cũ.'
  },
  {
    difficulty: 'medium',
    category: 'Hàm băm MD5',
    question: 'MD5 tạo ra chuỗi băm có độ dài bao nhiêu bit?',
    options: ['64 bit', '128 bit', '256 bit', '512 bit'],
    answer: '128 bit',
    explanation: 'Thuật toán MD5 sản sinh ra một giá trị băm 128-bit (thường biểu diễn bằng 32 ký tự thập lục phân).'
  },
  {
    difficulty: 'medium',
    category: 'Hàm băm MD5',
    question: 'Tại sao hiện nay MD5 không còn được khuyến nghị sử dụng cho các mục đích bảo mật cao?',
    options: [
      'Vì tốc độ quá chậm',
      'Vì nó dễ bị tấn công va chạm (Collision)',
      'Vì nó tốn nhiều bộ nhớ RAM',
      'Vì nó chỉ chạy được trên Linux'
    ],
    answer: 'Vì nó dễ bị tấn công va chạm (Collision)',
    explanation: 'Nhiều nghiên cứu đã chỉ ra rằng có thể tạo ra hai file khác nhau nhưng có cùng mã băm MD5.'
  },
  {
    difficulty: 'medium',
    category: 'Khối (Block Cipher)',
    question: 'DES sử dụng kích thước khối là bao nhiêu bit?',
    options: ['32 bit', '64 bit', '128 bit', '256 bit'],
    answer: '64 bit',
    explanation: 'DES làm việc trên các khối dữ liệu 64-bit.'
  },
  {
    difficulty: 'medium',
    category: 'Hàm băm',
    question: 'Mục đích chính của việc "Salt" mật khẩu trước khi băm là gì?',
    options: ['Làm mật khẩu ngắn lại', 'Chống lại tấn công bảng cầu vồng (Rainbow Table)', 'Làm mật khẩu dễ nhớ hơn', 'Tăng tốc độ kiểm tra'],
    answer: 'Chống lại tấn công bảng cầu vồng (Rainbow Table)',
    explanation: 'Salt thêm dữ liệu ngẫu nhiên vào mật khẩu để đảm bảo các mật khẩu giống nhau có mã băm khác nhau.'
  },
  {
    difficulty: 'medium',
    category: 'Luồng (Stream Cipher)',
    question: 'Thuật toán RC4 là một ví dụ điển hình của loại mật mã nào?',
    options: ['Mật mã khối (Block Cipher)', 'Mật mã luồng (Stream Cipher)', 'Mật mã bất đối xứng', 'Hàm băm'],
    answer: 'Mật mã luồng (Stream Cipher)',
    explanation: 'RC4 mã hóa từng byte (hoặc bit) dữ liệu một cách tuần tự.'
  },
  {
    difficulty: 'medium',
    category: 'Xác thực',
    question: 'HMAC được sử dụng để làm gì?',
    options: ['Mã hóa tệp tin lớn', 'Xác thực thông điệp bằng cách kết hợp hàm băm và khóa bí mật', 'Tạo ra khóa công khai', 'Nén dữ liệu'],
    answer: 'Xác thực thông điệp bằng cách kết hợp hàm băm và khóa bí mật',
    explanation: 'HMAC (Hash-based Message Authentication Code) đảm bảo tính toàn vẹn và xác thực của dữ liệu.'
  },
  {
    difficulty: 'medium',
    category: 'Diffie-Hellman',
    question: 'Giao thức Diffie-Hellman giải quyết vấn đề gì?',
    options: ['Mã hóa dữ liệu', 'Trao đổi khóa bí mật qua kênh không an toàn', 'Ký số văn bản', 'Lưu trữ mật khẩu'],
    answer: 'Trao đổi khóa bí mật qua kênh không an toàn',
    explanation: 'DH cho phép hai bên tạo ra một khóa bí mật chung mà không cần gửi trực tiếp khóa đó cho nhau.'
  },

  // 3. Hard Levels (Hard)
  {
    difficulty: 'hard',
    category: 'AES',
    question: 'Trong thuật toán AES, bước nào thực hiện việc thế byte phi tuyến tính thông qua bảng tra cứu S-Box?',
    options: ['ShiftRows', 'MixColumns', 'AddRoundKey', 'SubBytes'],
    answer: 'SubBytes',
    explanation: 'SubBytes là bước duy nhất thực hiện thay thế byte phi tuyến để tạo ra sự xáo trộn mạnh mẽ.'
  },
  {
    difficulty: 'hard',
    category: 'AES',
    question: 'Chuẩn mã hóa AES hỗ trợ các kích thước khóa nào sau đây?',
    options: [
      '64, 128, 256 bit',
      '128, 192, 256 bit',
      '56, 112, 168 bit',
      '32, 64, 128 bit'
    ],
    answer: '128, 192, 256 bit',
    explanation: 'AES là chuẩn hiện đại với 3 cấp độ khóa phổ biến nhất là 128, 192 và 256 bit.'
  },
  {
    difficulty: 'hard',
    category: 'RSA & Khóa công khai',
    question: 'Trong hệ mật RSA, thông điệp được mã hóa bằng loại khóa nào?',
    options: [
      'Khóa bí mật (Private Key)',
      'Khóa công khai (Public Key)',
      'Khóa đối xứng (Symmetric Key)',
      'Khóa phiên (Session Key)'
    ],
    answer: 'Khóa công khai (Public Key)',
    explanation: 'Trong mã hóa bất đối xứng, bất kỳ ai cũng có thể dùng Public Key để mã hóa nhưng chỉ chủ nhân có Private Key mới giải mã được.'
  },
  {
    difficulty: 'hard',
    category: 'RSA & Khóa công khai',
    question: 'Chữ ký số (Digital Signature) sử dụng RSA nhằm mục đích chính là gì?',
    options: [
      'Để nén dữ liệu',
      'Để chứng thực danh tính và đảm bảo tính toàn vẹn của thông điệp',
      'Để làm cho thông điệp nhanh hơn',
      'Để thay thế hàm băm'
    ],
    answer: 'Để chứng thực danh tính và đảm bảo tính toàn vẹn của thông điệp',
    explanation: 'Chữ ký số cho phép người nhận xác minh dữ liệu thực sự đến từ người gửi và không bị chỉnh sửa.'
  },
  {
    difficulty: 'hard',
    category: 'Tấn công Mật mã',
    question: 'Tấn công trung gian (Meet-in-the-middle) là lý do chính khiến thuật toán nào bị coi là yếu?',
    options: ['AES', 'Double DES', 'Triple DES', 'RSA'],
    answer: 'Double DES',
    explanation: 'Tấn công này làm giảm độ phức tạp của Double DES xuống gần bằng DES đơn.'
  },
  {
    difficulty: 'hard',
    category: 'Đường cong Elliptic',
    question: 'ECC (Elliptic Curve Cryptography) có ưu điểm gì so với RSA?',
    options: ['Khóa ngắn hơn nhưng độ bảo mật tương đương', 'Dễ tính toán hơn bằng tay', 'Không cần khóa công khai', 'Đã có từ lâu đời hơn'],
    answer: 'Khóa ngắn hơn nhưng độ bảo mật tương đương',
    explanation: 'ECC cung cấp cùng mức độ bảo mật với kích thước khóa nhỏ hơn nhiều so với RSA, giúp tiết kiệm băng thông và bộ nhớ.'
  },
  {
    difficulty: 'hard',
    category: 'AES',
    question: 'Trong AES, bước MixColumns hoạt động trên đơn vị nào của trạng thái (State)?',
    options: ['Từng byte riêng lẻ', 'Từng hàng (Rows)', 'Từng cột (Columns)', 'Toàn bộ khối'],
    answer: 'Từng cột (Columns)',
    explanation: 'MixColumns thực hiện phép nhân ma trận trên từng cột của bảng trạng thái 4x4.'
  },
  {
    difficulty: 'hard',
    category: 'Tấn công',
    question: 'Tấn công Kỷ nguyên (Birthday Attack) dựa trên xác suất để tìm ra điều gì trong hàm băm?',
    options: ['Khóa bí mật', 'Sự va chạm (Collision)', 'Văn bản gốc', 'Độ dài thông điệp'],
    answer: 'Sự va chạm (Collision)',
    explanation: 'Dựa trên nghịch lý ngày sinh, tấn công này tìm hai đầu vào khác nhau có cùng giá trị băm.'
  },
  {
    difficulty: 'hard',
    category: 'Mật mã lượng tử',
    question: 'Thuật toán Shor có khả năng phá vỡ hệ mật nào nếu máy tính lượng tử đủ mạnh?',
    options: ['AES', 'RSA và ECC', 'SHA-256', '3DES'],
    answer: 'RSA và ECC',
    explanation: 'Thuật toán Shor có thể phân tích thừa số nguyên (RSA) và tính logarit rời rạc (ECC) trong thời gian đa thức.'
  },
  {
    difficulty: 'hard',
    category: 'Chế độ hoạt động',
    question: 'Chế độ GCM (Galois/Counter Mode) cung cấp tính năng gì thêm so với CTR?',
    options: ['Nén dữ liệu', 'Xác thực dữ liệu (Authenticated Encryption)', 'Mã hóa nhanh hơn', 'Khóa dài hơn'],
    answer: 'Xác thực dữ liệu (Authenticated Encryption)',
    explanation: 'GCM kết hợp chế độ đếm (Counter mode) với xác thực Galois để đảm bảo cả tính bảo mật và tính toàn vẹn.'
  }
];
