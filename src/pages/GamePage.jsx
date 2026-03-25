import { useState, useCallback } from 'react';
import { quizData } from '../data/quiz';
import './GamePage.css'; // Assuming I might want to style it specifically

function getRandomQuestion(prevIndex = -1) {
  let index = Math.floor(Math.random() * quizData.length);
  // Avoid repeating the same question immediately
  while (index === prevIndex && quizData.length > 1) {
    index = Math.floor(Math.random() * quizData.length);
  }
  const q = quizData[index];
  
  // Shuffle options for more challenge
  const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
  
  return { ...q, options: shuffledOptions, originalIndex: index };
}

export default function GamePage() {
  const [question, setQuestion] = useState(() => getRandomQuestion());
  const [selected, setSelected] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [streak, setStreak] = useState(0);

  const handleAnswer = (option) => {
    if (isAnswered) return;
    
    setSelected(option);
    setIsAnswered(true);
    setTotal((t) => t + 1);
    
    if (option === question.answer) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = useCallback(() => {
    setQuestion(getRandomQuestion(question.originalIndex));
    setSelected(null);
    setIsAnswered(false);
  }, [question.originalIndex]);

  const isCorrect = selected === question.answer;

  return (
    <div className="page-container game-container fade-in">
      <div className="page-header" style={{ marginBottom: '20px' }}>
        <h1 className="page-title">🧠 Thử Thách Mật Mã</h1>
        <p className="page-subtitle">
          Kiểm tra kiến thức về 6 trụ cột mật mã học qua bộ câu hỏi trắc nghiệm tổng hợp.
        </p>
      </div>

      <div className="game-score-bar">
        <div className="game-score">
          🏆 Điểm: <span className="score-value">{score}/{total}</span>
        </div>
        <div className="game-score">
          🔥 Chuỗi: <span className="score-value">{streak}</span>
        </div>
        <div className="game-score">
          📊 Tỉ lệ: <span className="score-value">
            {total > 0 ? Math.round((score / total) * 100) : 0}%
          </span>
        </div>
      </div>

      <div className="game-question-card quiz-mode">
        {/* Category Badge */}
        <div style={{ 
          display: 'inline-block', 
          background: '#6c5ce7', 
          color: 'white', 
          padding: '4px 12px', 
          borderRadius: '50px', 
          fontSize: '0.75rem', 
          fontWeight: 'bold',
          marginBottom: '15px',
          fontFamily: 'var(--font-primary)'
        }}>
          📁 {question.category}
        </div>

        <div className="game-question-text" style={{ 
          fontSize: '1.2rem', 
          fontWeight: '700', 
          color: '#2d3436', 
          lineHeight: '1.5',
          marginBottom: '25px',
          fontFamily: 'var(--font-academic)'
        }}>
          {question.question}
        </div>

        <div className="game-options quiz-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '12px' 
        }}>
          {question.options.map((option, idx) => {
            let cls = 'game-option-btn quiz-option';
            if (isAnswered) {
              if (option === question.answer) cls += ' correct';
              else if (option === selected) cls += ' wrong';
            }
            return (
              <button
                key={idx}
                className={cls}
                onClick={() => handleAnswer(option)}
                disabled={isAnswered}
                style={{
                  textAlign: 'left',
                  padding: '15px 20px',
                  borderRadius: '12px',
                  height: 'auto',
                  minHeight: '60px',
                  fontSize: '0.95rem'
                }}
              >
                <span style={{ marginRight: '10px', opacity: 0.6 }}>{String.fromCharCode(65 + idx)}.</span>
                {option}
              </button>
            );
          })}
        </div>

        {/* Explanation & Feedback */}
        {isAnswered && (
          <div className={`quiz-feedback-box fade-in ${isCorrect ? 'is-correct' : 'is-wrong'}`} style={{
            marginTop: '30px',
            padding: '20px',
            borderRadius: '12px',
            background: isCorrect ? '#f0fff4' : '#fff5f5',
            border: `1px solid ${isCorrect ? '#68d391' : '#feb2b2'}`,
          }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '10px', color: isCorrect ? '#2f855a' : '#c53030' }}>
              {isCorrect ? '✅ Chính xác!' : `❌ Sai rồi! Đáp án đúng là: ${question.answer}`}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#4a5568', fontStyle: 'italic', lineHeight: '1.6' }}>
              <strong>Giải thích:</strong> {question.explanation}
            </div>
          </div>
        )}
      </div>

      {isAnswered && (
        <button 
          className="game-next-btn quiz-next" 
          onClick={handleNext}
          style={{
            marginTop: '25px',
            width: '100%',
            background: '#6c5ce7',
            padding: '15px',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}
        >
          Tiếp theo →
        </button>
      )}
    </div>
  );
}
