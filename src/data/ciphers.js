export const cipherCategories = [
  {
    id: 'group1',
    name: 'Kiến thức tổng quan',
    description: 'Các hệ mật mã cổ điển cơ bản',
    icon: '🏛️',
    color: '#FDCB6E',
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
        ],
      },
    ],
  },
  {
    id: 'group2',
    name: 'Mật mã đối xứng',
    description: 'Mật mã đối xứng và chuẩn mã khối',
    icon: '🛡️',
    color: '#00B894',
    subcategories: [
      {
        id: 'symmetric',
        name: 'Mã đối xứng',
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
            id: 'des',
            name: 'DES / 3DES',
            description: 'Data Encryption Standard và Triple DES.',
            icon: '🔐',
            difficulty: 'Khó',
          },
          {
            id: 'aes',
            name: 'AES',
            description: 'Advanced Encryption Standard — tiêu chuẩn mã hóa hiện đại.',
            icon: '🛡️',
            difficulty: 'Khó',
          },
        ],
      },
    ],
  },
  {
    id: 'group3',
    name: 'Hàm băm & Khóa công khai',
    description: 'Hàm băm dữ liệu, mã hóa RSA và chữ ký số',
    icon: '🔑',
    color: '#A29BFE',
    subcategories: [
      {
        id: 'asymmetric-hash',
        name: 'Hàm băm & Bất đối xứng',
        color: '#A29BFE',
        ciphers: [
          {
            id: 'hash',
            name: 'MD5 / SHA',
            description: 'Các hàm băm MD5, SHA-1, SHA-256, SHA-512.',
            icon: '#️⃣',
            difficulty: 'Trung bình',
          },
          {
            id: 'rsa',
            name: 'RSA',
            description: 'Mã hóa công khai dựa trên bài toán phân tích thừa số nguyên tố.',
            icon: '🔑',
            difficulty: 'Khó',
          },
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
