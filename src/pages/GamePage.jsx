import { useState, useCallback, useEffect } from 'react';
import { quizData } from '../data/quiz';
import { useAuth } from '../context/AuthContext';
import { saveUserStats, saveGameRound, getUserStats } from '../services/dbService';
import './GamePage.css';

const QUESTIONS_PER_ROUND = 10;

export default function GamePage() {
  const { user } = useAuth();
  
  // Game States: 'selecting', 'playing', 'finished'
  const [gameState, setGameState] = useState('selecting');
  const [level, setLevel] = useState(null);
  
  // Playing States
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  // Results
  const [roundScore, setRoundScore] = useState(0);
  const [roundHistory, setRoundHistory] = useState([]);
  
  // Cumulative Stats (from DB)
  const [totalStats, setTotalStats] = useState({ score: 0, total: 0 });

  // Load cumulative stats on login
  useEffect(() => {
    if (user) {
      getUserStats(user.uid).then(stats => {
        if (stats) setTotalStats(stats);
      });
    }
  }, [user]);

  // Start a new game session
  const startLevel = (selectedLevel) => {
    // Filter questions by level
    const filtered = quizData.filter(q => q.difficulty === selectedLevel);
    
    // Pick unique random questions
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(QUESTIONS_PER_ROUND, shuffled.length));
    
    // Prepare question options (shuffle them too)
    const prepared = selected.map(q => ({
      ...q,
      shuffledOptions: [...q.options].sort(() => Math.random() - 0.5)
    }));

    setLevel(selectedLevel);
    setQuestions(prepared);
    setCurrentIndex(0);
    setRoundScore(0);
    setRoundHistory([]);
    setIsAnswered(false);
    setSelectedOption(null);
    setGameState('playing');
  };

  const handleAnswer = (option) => {
    if (isAnswered) return;

    const currentQ = questions[currentIndex];
    const isCorrect = option === currentQ.answer;

    setSelectedOption(option);
    setIsAnswered(true);

    if (isCorrect) setRoundScore(prev => prev + 1);

    // Track history for this round
    setRoundHistory(prev => [
      ...prev,
      {
        question: currentQ.question,
        selectedAnswer: option,
        correctAnswer: currentQ.answer,
        isCorrect: isCorrect
      }
    ]);
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setIsAnswered(false);
      setSelectedOption(null);
    } else {
      finishGame();
    }
  };

  const finishGame = async () => {
    setGameState('finished');

    // Prepare round result object
    const finalRoundData = {
      level,
      score: roundScore,
      totalQuestions: questions.length,
      history: roundHistory,
      timestamp: new Date().toISOString()
    };

    if (user) {
      // 1. Save detailed round record (Encrypted)
      await saveGameRound(user.uid, finalRoundData);

      // 2. Update overall cumulative stats (Encrypted)
      const newTotalScore = totalStats.score + roundScore;
      const newTotalQuestions = totalStats.total + questions.length;
      
      await saveUserStats(user.uid, {
        score: newTotalScore,
        total: newTotalQuestions
      });
      
      setTotalStats({ score: newTotalScore, total: newTotalQuestions });
    }
  };

  const resetGame = () => {
    setGameState('selecting');
    setLevel(null);
  };

  // --- RENDERING HELPERS ---

  if (gameState === 'selecting') {
    return (
      <div className="page-container fade-in">
        <div className="level-selection-container">
          <h1 className="page-title">Chọn Mức Độ Thử Thách</h1>
          <p className="page-subtitle">Mỗi vòng chơi gồm 10 câu hỏi trắc nghiệm.</p>
          
          <div className="level-grid">
            <div className="level-card easy" onClick={() => startLevel('easy')}>
              <span className="level-icon">🌱</span>
              <span className="level-name">Dễ</span>
              <p className="level-desc">Mật mã cổ điển & logic cơ bản. Phù hợp cho người mới bắt đầu.</p>
            </div>
            <div className="level-card medium" onClick={() => startLevel('medium')}>
              <span className="level-icon">⚙️</span>
              <span className="level-name">Trung bình</span>
              <p className="level-desc">Các chuẩn mã hóa hiện đại và hàm băm. Yêu cầu kiến thức nền tảng.</p>
            </div>
            <div className="level-card hard" onClick={() => startLevel('hard')}>
              <span className="level-icon">⚡</span>
              <span className="level-name">Khó</span>
              <p className="level-desc">Thuật toán phức tạp và các kỹ thuật tấn công. Thử thách thực sự!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <div className="page-container fade-in">
        <div className="summary-card">
          <h1 className="page-title">Kết Thúc Vòng Chơi!</h1>
          <p className="page-subtitle">Mức độ: <strong style={{ color: 'var(--accent-purple)' }}>{level.toUpperCase()}</strong></p>
          
          <div className="summary-score">
            {roundScore}/{questions.length}
          </div>
          
          <p style={{ color: 'var(--text-secondary)' }}>
            Dữ liệu vòng chơi này đã được mã hóa và lưu vào hệ thống.
          </p>

          <div className="summary-history">
            <h3>Chi tiết kết quả:</h3>
            {roundHistory.map((item, idx) => (
              <div key={idx} className={`history-item ${item.isCorrect ? 'correct' : 'wrong'}`}>
                <span className="res-q">{idx + 1}. {item.question}</span>
                <span className="res-a">{item.isCorrect ? '✅' : '❌'}</span>
              </div>
            ))}
          </div>

          <button className="restart-btn" onClick={resetGame}>Tiếp tục thử thách mới</button>
        </div>
      </div>
    );
  }

  // --- GAMEPLAY RENDER ---
  const currentQuestion = questions[currentIndex];

  return (
    <div className="page-container game-container fade-in">
      <div className="game-progress-wrapper">
        <div className="question-indicator">
          CÂU HỎI {currentIndex + 1} / {questions.length}
        </div>
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="game-question-card quiz-mode">
        <div style={{ 
          display: 'inline-block', 
          background: 'var(--accent-purple)', 
          color: 'white', 
          padding: '4px 12px', 
          borderRadius: '50px', 
          fontSize: '0.7rem', 
          fontWeight: 'bold',
          marginBottom: '15px'
        }}>
          📁 {currentQuestion.category}
        </div>

        <div className="game-question-text" style={{ 
          fontSize: '1.25rem', 
          fontWeight: '700', 
          color: '#2d3436', 
          lineHeight: '1.5',
          marginBottom: '25px'
        }}>
          {currentQuestion.question}
        </div>

        <div className="game-options quiz-grid">
          {currentQuestion.shuffledOptions.map((option, idx) => {
            let cls = 'game-option-btn quiz-option';
            if (isAnswered) {
              if (option === currentQuestion.answer) cls += ' correct';
              else if (option === selectedOption) cls += ' wrong';
            }
            return (
              <button
                key={idx}
                className={cls}
                onClick={() => handleAnswer(option)}
                disabled={isAnswered}
              >
                <span style={{ marginRight: '10px', opacity: 0.6 }}>{String.fromCharCode(65 + idx)}.</span>
                {option}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className={`quiz-feedback-box fade-in ${selectedOption === currentQuestion.answer ? 'is-correct' : 'is-wrong'}`} style={{
            marginTop: '30px',
            padding: '20px',
            borderRadius: '12px',
            background: selectedOption === currentQuestion.answer ? '#f0fff4' : '#fff5f5',
            border: `1px solid ${selectedOption === currentQuestion.answer ? '#68d391' : '#feb2b2'}`,
          }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '10px', color: selectedOption === currentQuestion.answer ? '#2f855a' : '#c53030' }}>
              {selectedOption === currentQuestion.answer ? '✅ Chính xác!' : `❌ Sai rồi!`}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#4a5568', fontStyle: 'italic', lineHeight: '1.6' }}>
              <strong>Giải thích:</strong> {currentQuestion.explanation}
            </div>
          </div>
        )}
      </div>

      {isAnswered && (
        <button className="restart-btn" style={{ width: '100%', marginTop: '10px' }} onClick={nextQuestion}>
          {currentIndex + 1 === questions.length ? 'Xem kết quả' : 'Câu tiếp theo →'}
        </button>
      )}
    </div>
  );
}
