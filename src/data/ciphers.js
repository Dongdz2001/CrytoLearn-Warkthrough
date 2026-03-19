export const cipherCategories = [
  {
    id: 'two-way',
    name: 'Mã hóa 2 chiều',
    description: 'Có thể mã hóa và giải mã',
    icon: '🔄',
    color: '#6C5CE7',
    subcategories: [
      {
        id: 'classic',
        name: 'Mã hóa cổ điển',
        color: '#FDCB6E',
        ciphers: [
          {
            id: 'caesar',
            name: 'Caesar Cipher',
            description: 'Dịch chuyển ký tự trong bảng chữ cái theo một số bước cố định.',
            icon: '🏛️',
            difficulty: 'Dễ',
          },
          {
            id: 'vigenere',
            name: 'Vigenère Cipher',
            description: 'Sử dụng từ khóa để dịch chuyển ký tự với nhiều bước khác nhau.',
            icon: '🗝️',
            difficulty: 'Trung bình',
          },
          {
            id: 'atbash',
            name: 'Atbash Cipher',
            description: 'Đảo ngược bảng chữ cái: A↔Z, B↔Y, ...',
            icon: '🔀',
            difficulty: 'Dễ',
          },
          {
            id: 'rot13',
            name: 'ROT13',
            description: 'Dịch chuyển ký tự 13 vị trí, tự nghịch đảo.',
            icon: '🔁',
            difficulty: 'Dễ',
          },
        ],
      },
      {
        id: 'symmetric',
        name: 'Mã đối xứng (Symmetric)',
        color: '#00B894',
        ciphers: [
          {
            id: 'xor',
            name: 'XOR Cipher',
            description: 'Mã hóa bằng phép XOR giữa plaintext và key.',
            icon: '⊕',
            difficulty: 'Trung bình',
          },
          {
            id: 'aes',
            name: 'AES',
            description: 'Advanced Encryption Standard — tiêu chuẩn mã hóa hiện đại.',
            icon: '🛡️',
            difficulty: 'Khó',
          },
          {
            id: 'des',
            name: 'DES / 3DES',
            description: 'Data Encryption Standard và Triple DES.',
            icon: '🔐',
            difficulty: 'Khó',
          },
        ],
      },
      {
        id: 'asymmetric',
        name: 'Mã bất đối xứng (Asymmetric)',
        color: '#A29BFE',
        ciphers: [
          {
            id: 'rsa',
            name: 'RSA',
            description: 'Mã hóa công khai dựa trên bài toán phân tích thừa số nguyên tố.',
            icon: '🔑',
            difficulty: 'Khó',
          },
        ],
      },
    ],
  },
  {
    id: 'one-way',
    name: 'Mã hóa 1 chiều (Hashing)',
    description: 'Không thể giải mã ngược, dùng kiểm tra toàn vẹn',
    icon: '🔏',
    color: '#E17055',
    subcategories: [
      {
        id: 'hash',
        name: 'Hàm băm (Hash)',
        color: '#E17055',
        ciphers: [
          {
            id: 'hash',
            name: 'MD5 / SHA',
            description: 'Các hàm băm MD5, SHA-1, SHA-256, SHA-512.',
            icon: '#️⃣',
            difficulty: 'Trung bình',
          },
        ],
      },
    ],
  },
  {
    id: 'signature',
    name: 'Chữ ký số (Digital Signature)',
    description: 'Xác thực danh tính và toàn vẹn dữ liệu',
    icon: '✍️',
    color: '#0984E3',
    subcategories: [
      {
        id: 'digital-sig',
        name: 'Chữ ký RSA',
        color: '#0984E3',
        ciphers: [
          {
            id: 'rsa-signature',
            name: 'RSA Signature',
            description: 'Ký và xác minh chữ ký số bằng RSA.',
            icon: '📝',
            difficulty: 'Khó',
          },
        ],
      },
    ],
  },
  {
    id: 'encoding',
    name: 'Bảng mã (Encoding)',
    description: 'Chuyển đổi định dạng dữ liệu, không phải bảo mật',
    icon: '📦',
    color: '#00CEC9',
    subcategories: [
      {
        id: 'encode',
        name: 'Encode / Decode',
        color: '#00CEC9',
        ciphers: [
          {
            id: 'base64',
            name: 'Base64',
            description: 'Mã hóa dữ liệu thành chuỗi ASCII an toàn.',
            icon: '📄',
            difficulty: 'Dễ',
          },
          {
            id: 'hex-binary',
            name: 'Hex / Binary',
            description: 'Chuyển đổi giữa Text, Hex và Binary.',
            icon: '🔢',
            difficulty: 'Dễ',
          },
        ],
      },
    ],
  },
];

// Flatten all ciphers for quick access
export function getAllCiphers() {
  const all = [];
  cipherCategories.forEach(cat => {
    cat.subcategories.forEach(sub => {
      sub.ciphers.forEach(cipher => {
        all.push({
          ...cipher,
          categoryId: cat.id,
          categoryName: cat.name,
          categoryColor: cat.color,
          subcategoryName: sub.name,
          subcategoryColor: sub.color,
        });
      });
    });
  });
  return all;
}

export function getCipherById(id) {
  return getAllCiphers().find(c => c.id === id);
}
