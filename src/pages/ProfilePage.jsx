import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserStats, getRoundHistory } from '../services/dbService';
import './ProfilePage.css';

export default function ProfilePage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRoundId, setExpandedRoundId] = useState(null);

  const toggleRound = (id) => {
    setExpandedRoundId(expandedRoundId === id ? null : id);
  };

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const [userStats, userHistory] = await Promise.all([
            getUserStats(user.uid),
            getRoundHistory(user.uid, 20) // Fetch last 20 rounds
          ]);
          setStats(userStats);
          setHistory(userHistory);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="page-container fade-in">
        <div className="auth-notice">
          <h1>Vui lòng đăng nhập</h1>
          <p>Bạn cần đăng nhập để xem hồ sơ và lịch sử chơi của mình.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page-container fade-in">
        <div className="loading-spinner">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="page-container profile-container fade-in">
      <div className="profile-header">
        <div className="profile-user-info">
          <img src={user.photoURL} alt={user.displayName} className="profile-avatar" />
          <div className="profile-text">
            <h1 className="profile-name">{user.displayName}</h1>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stats-card">
          <span className="stats-icon">🏆</span>
          <div className="stats-content">
            <span className="stats-label">Tổng Điểm</span>
            <span className="stats-value">{stats?.score || 0}</span>
          </div>
        </div>
        <div className="stats-card">
          <span className="stats-icon">❓</span>
          <div className="stats-content">
            <span className="stats-label">Câu Hỏi Đã Giải</span>
            <span className="stats-value">{stats?.total || 0}</span>
          </div>
        </div>
        <div className="stats-card">
          <span className="stats-icon">🎯</span>
          <div className="stats-content">
            <span className="stats-label">Tỉ Lệ Chính Xác</span>
            <span className="stats-value">
              {stats?.total > 0 ? Math.round((stats.score / stats.total) * 100) : 0}%
            </span>
          </div>
        </div>
      </div>

      <div className="history-section">
        <h2 className="section-title">Lịch Sử Vòng Chơi</h2>
        {history.length === 0 ? (
          <div className="empty-history">Bạn chưa thực hiện vòng chơi nào.</div>
        ) : (
          <div className="history-list">
            {history.map((round) => (
              <div key={round.id} className="history-round-wrapper">
                <div 
                  className={`history-round-card ${expandedRoundId === round.id ? 'expanded' : ''}`}
                  onClick={() => toggleRound(round.id)}
                >
                  <div className="round-main-info">
                    <div className={`round-level-badge ${round.level}`}>
                      {round.level === 'easy' ? 'Dễ' : round.level === 'medium' ? 'Trung bình' : 'Khó'}
                    </div>
                    <div className="round-date">
                      {round.timestamp?.toLocaleString('vi-VN')}
                    </div>
                  </div>
                  <div className="round-score-info">
                    <span className="round-score-text">Đúng: <strong>{round.score}/{round.totalQuestions || 10}</strong></span>
                    <div className="round-progress-track">
                      <div 
                        className="round-progress-fill" 
                        style={{ width: `${(round.score / (round.totalQuestions || 10)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="expand-indicator">
                    {expandedRoundId === round.id ? '▲' : '▼'}
                  </div>
                </div>

                {expandedRoundId === round.id && round.history && (
                  <div className="round-details-container fade-in">
                    <h4 className="details-heading">Chi tiết các câu hỏi</h4>
                    <div className="details-list">
                      {round.history.map((q, idx) => (
                        <div key={idx} className={`detail-item ${q.isCorrect ? 'correct' : 'wrong'}`}>
                          <div className="detail-question">
                            <span className="q-num">Câu {idx + 1}:</span> {q.question}
                          </div>
                          <div className="detail-answers">
                            <div className="ans-row">
                              <span className="ans-label">Bạn chọn:</span>
                              <span className={`ans-value ${q.isCorrect ? 'text-success' : 'text-danger'}`}>
                                {q.selectedAnswer || 'Không có lựa chọn'}
                              </span>
                            </div>
                            {!q.isCorrect && (
                              <div className="ans-row">
                                <span className="ans-label">Đáp án đúng:</span>
                                <span className="ans-value text-success">{q.correctAnswer}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
