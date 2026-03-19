import { useState, useCallback } from 'react';
import { caesarEncrypt } from '../ciphers/caesar';
import { vigenereEncrypt } from '../ciphers/vigenere';
import { atbashEncrypt } from '../ciphers/atbash';
import { rot13Encrypt } from '../ciphers/rot13';
import { xorEncrypt } from '../ciphers/xor';
import { base64Encode, textToHex } from '../ciphers/base64';
import { md5Hash, sha256Hash } from '../ciphers/hash';

const sampleTexts = [
  'Hello World',
  'Cryptography is fun',
  'Secret message',
  'Attack at dawn',
  'The quick brown fox',
  'Keep it secret',
  'Information security',
  'Data encryption',
];

const algorithms = [
  {
    id: 'caesar',
    name: 'Caesar Cipher',
    encrypt: (text) => caesarEncrypt(text, 3 + Math.floor(Math.random() * 20)),
    hints: [
      'Đây là mã hóa cổ điển, dịch chuyển ký tự.',
      'Mỗi chữ cái được dịch cùng một khoảng cách.',
      'Julius Caesar từng dùng phương pháp này.',
    ],
  },
  {
    id: 'vigenere',
    name: 'Vigenère Cipher',
    encrypt: (text) => vigenereEncrypt(text, 'SECRET'),
    hints: [
      'Sử dụng từ khóa để mã hóa.',
      'Các ký tự khác nhau dịch chuyển khác nhau.',
      'Từng được gọi là "mật mã không thể phá".',
    ],
  },
  {
    id: 'atbash',
    name: 'Atbash Cipher',
    encrypt: (text) => atbashEncrypt(text),
    hints: [
      'Đây là mã đảo ngược bảng chữ cái.',
      'A thành Z, B thành Y...',
      'Có nguồn gốc từ Hebrew cổ đại.',
    ],
  },
  {
    id: 'rot13',
    name: 'ROT13',
    encrypt: (text) => rot13Encrypt(text),
    hints: [
      'Đây là trường hợp đặc biệt của Caesar.',
      'Dịch chuyển đúng 13 vị trí.',
      'Mã hóa 2 lần sẽ ra bản gốc.',
    ],
  },
  {
    id: 'xor',
    name: 'XOR Cipher',
    encrypt: (text) => xorEncrypt(text, 'KEY'),
    hints: [
      'Kết quả là các cặp số hex.',
      'Sử dụng phép toán bit XOR.',
      'Nền tảng của nhiều thuật toán hiện đại.',
    ],
  },
  {
    id: 'base64',
    name: 'Base64',
    encrypt: (text) => base64Encode(text),
    hints: [
      'Đây không phải mã hóa bảo mật.',
      'Kết quả chỉ chứa A-Z, a-z, 0-9, +, /, =',
      'Thường kết thúc bằng dấu = hoặc ==',
    ],
  },
  {
    id: 'hex',
    name: 'Hex Encoding',
    encrypt: (text) => textToHex(text),
    hints: [
      'Đây là chuyển đổi hệ cơ số.',
      'Mỗi ký tự thành 2 chữ số hex (0-9, a-f).',
      'Hệ thập lục phân (cơ số 16).',
    ],
  },
  {
    id: 'md5',
    name: 'MD5 Hash',
    encrypt: (text) => md5Hash(text),
    hints: [
      'Đây là hàm băm 1 chiều.',
      'Kết quả luôn có 32 ký tự hex.',
      'Không thể giải mã ngược.',
    ],
  },
  {
    id: 'sha256',
    name: 'SHA-256 Hash',
    encrypt: (text) => sha256Hash(text),
    hints: [
      'Đây là hàm băm 1 chiều.',
      'Kết quả luôn có 64 ký tự hex.',
      'Được dùng trong Bitcoin.',
    ],
  },
];

function getRandomQuestion() {
  const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
  const algo = algorithms[Math.floor(Math.random() * algorithms.length)];
  const cipherText = algo.encrypt(text);

  // Generate 4 options, including the correct one
  const options = [algo];
  while (options.length < 4) {
    const random = algorithms[Math.floor(Math.random() * algorithms.length)];
    if (!options.find((o) => o.id === random.id)) {
      options.push(random);
    }
  }
  // Shuffle options
  options.sort(() => Math.random() - 0.5);

  return { text, cipherText, correctAlgo: algo, options };
}

export default function GamePage() {
  const [question, setQuestion] = useState(() => getRandomQuestion());
  const [selected, setSelected] = useState(null);
  const [hintIndex, setHintIndex] = useState(-1);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [streak, setStreak] = useState(0);

  const handleAnswer = (algoId) => {
    if (selected !== null) return;
    setSelected(algoId);
    setTotal((t) => t + 1);
    if (algoId === question.correctAlgo.id) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = useCallback(() => {
    setQuestion(getRandomQuestion());
    setSelected(null);
    setHintIndex(-1);
  }, []);

  const handleHint = () => {
    const maxHints = question.correctAlgo.hints.length;
    if (hintIndex < maxHints - 1) {
      setHintIndex((i) => i + 1);
    }
  };

  const isCorrect = selected === question.correctAlgo.id;

  return (
    <div className="page-container game-container fade-in">
      <div className="page-header">
        <h1 className="page-title">🎮 Đoán Thuật Toán</h1>
        <p className="page-subtitle">
          Nhìn đoạn mã hóa và đoán xem thuật toán nào được sử dụng!
        </p>
      </div>

      <div className="game-score-bar">
        <div className="game-score">
          🏆 Điểm: <span className="score-value">{score}/{total}</span>
        </div>
        <div className="game-score">
          🔥 Streak: <span className="score-value">{streak}</span>
        </div>
        <div className="game-score">
          📊 Tỉ lệ: <span className="score-value">
            {total > 0 ? Math.round((score / total) * 100) : 0}%
          </span>
        </div>
      </div>

      <div className="game-question-card">
        <div className="game-question-label">Đoạn văn bản đã được mã hóa:</div>
        <div className="game-cipher-text">{question.cipherText}</div>

        {selected !== null && (
          <div className="game-original-text">
            📝 Bản gốc: <strong>{question.text}</strong>
          </div>
        )}

        <div className="game-question-label" style={{ marginTop: '1rem' }}>
          Đây là thuật toán nào?
        </div>

        <div className="game-options">
          {question.options.map((algo) => {
            let cls = 'game-option-btn';
            if (selected !== null) {
              if (algo.id === question.correctAlgo.id) cls += ' correct';
              else if (algo.id === selected) cls += ' wrong';
            }
            return (
              <button
                key={algo.id}
                className={cls}
                onClick={() => handleAnswer(algo.id)}
                disabled={selected !== null}
              >
                {algo.name}
              </button>
            );
          })}
        </div>

        {/* Hints */}
        {selected === null && (
          <button className="game-hint-btn" onClick={handleHint}>
            💡 Gợi ý ({hintIndex + 1}/{question.correctAlgo.hints.length})
          </button>
        )}

        {hintIndex >= 0 && selected === null && (
          <div className="game-hint">
            {question.correctAlgo.hints.slice(0, hintIndex + 1).map((hint, i) => (
              <div key={i}>💡 {hint}</div>
            ))}
          </div>
        )}

        {/* Result */}
        {selected !== null && (
          <div className={`game-result ${isCorrect ? 'correct' : 'wrong'}`}>
            {isCorrect
              ? `✅ Chính xác! Đây là ${question.correctAlgo.name}.`
              : `❌ Sai rồi! Đáp án đúng là ${question.correctAlgo.name}.`}
          </div>
        )}
      </div>

      {selected !== null && (
        <button className="game-next-btn" onClick={handleNext}>
          Câu tiếp theo →
        </button>
      )}
    </div>
  );
}
