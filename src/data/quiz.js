export const quizData = [
  // 1. Classic Ciphers
  {
    category: 'Mã hóa Cổ điển',
    question: 'Thuật toán Caesar dịch chuyển ký tự "A" với khóa k=3 sẽ trở thành chữ cái nào?',
    options: ['C', 'D', 'B', 'E'],
    answer: 'D',
    explanation: 'A (0) + 3 = 3, tương ứng với chữ cái D (0=A, 1=B, 2=C, 3=D).'
  },
  {
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

  // 2. XOR & Logic
  {
    category: 'XOR & Logic',
    question: 'Phép toán XOR (1 ⊕ 0) cho kết quả là bao nhiêu?',
    options: ['0', '1', '2', 'Hệ thập lục phân'],
    answer: '1',
    explanation: 'Phép XOR trả về 1 nếu hai bit đầu vào khác nhau.'
  },
  {
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

  // 3. Triple DES & Feistel
  {
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

  // 4. AES
  {
    category: 'AES',
    question: 'Trong thuật toán AES, bước nào thực hiện việc thế byte phi tuyến tính thông qua bảng tra cứu S-Box?',
    options: ['ShiftRows', 'MixColumns', 'AddRoundKey', 'SubBytes'],
    answer: 'SubBytes',
    explanation: 'SubBytes là bước duy nhất thực hiện thay thế byte phi tuyến để tạo ra sự xáo trộn mạnh mẽ.'
  },
  {
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

  // 5. RSA & Public Key
  {
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

  // 6. Hash & MD5
  {
    category: 'Hàm băm MD5',
    question: 'Đặc điểm quan trọng nhất của một hàm băm (Hash Function) là gì?',
    options: [
      'Có thể giải mã ngược lại dễ dàng',
      'Là hàm một chiều (không thể đảo ngược)',
      'Dữ liệu đầu ra dài hơn dữ liệu đầu vào',
      'Sử dụng khóa chung'
    ],
    answer: 'Là hàm một chiều (không thể đảo ngược)',
    explanation: 'Hàm băm băm nát dữ liệu thành một chuỗi đại diện duy nhất và không thể khôi phục lại văn bản gốc từ mã băm.'
  },
  {
    category: 'Hàm băm MD5',
    question: 'MD5 tạo ra chuỗi băm có độ dài bao nhiêu bit?',
    options: ['64 bit', '128 bit', '256 bit', '512 bit'],
    answer: '128 bit',
    explanation: 'Thuật toán MD5 sản sinh ra một giá trị băm 128-bit (thường biểu diễn bằng 32 ký tự thập lục phân).'
  },
  {
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
  }
];
