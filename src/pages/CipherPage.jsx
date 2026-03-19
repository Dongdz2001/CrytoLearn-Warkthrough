import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCipherById } from '../data/ciphers';
import theories from '../data/theories';
import DemoTool from '../components/DemoTool';

export default function CipherPage() {
  const { id } = useParams();
  const cipher = getCipherById(id);
  const theory = theories[id];
  const [activeTab, setActiveTab] = useState('theory');

  if (!cipher || !theory) {
    return (
      <div className="page-container">
        <Link to="/" className="back-btn">← Quay lại</Link>
        <h2>Không tìm thấy thuật toán</h2>
      </div>
    );
  }

  return (
    <div className="page-container cipher-detail fade-in">
      <Link to="/" className="back-btn">← Quay lại trang chủ</Link>

      <div className="cipher-detail-header">
        <span className="cipher-detail-icon">{cipher.icon}</span>
        <div>
          <h1 className="cipher-detail-title">{theory.title}</h1>
          <div className="cipher-detail-category" style={{ color: cipher.categoryColor }}>
            {cipher.categoryName} › {cipher.subcategoryName}
          </div>
        </div>
      </div>

      <div className="tab-nav">
        <button
          className={`tab-btn ${activeTab === 'theory' ? 'active' : ''}`}
          onClick={() => setActiveTab('theory')}
        >
          📖 Lý thuyết
        </button>
        <button
          className={`tab-btn ${activeTab === 'demo' ? 'active' : ''}`}
          onClick={() => setActiveTab('demo')}
        >
          🛠️ Demo Tool
        </button>
      </div>

      {activeTab === 'theory' && (
        <div className="theory-content">
          <div className="theory-section">
            <h3>📜 Lịch sử</h3>
            <p>{theory.history}</p>
          </div>
          <div className="theory-section">
            <h3>⚙️ Cách hoạt động</h3>
            <p>{theory.howItWorks}</p>
          </div>
          <div className="theory-section">
            <h3>🔒 Độ an toàn</h3>
            <div className="security-badge">{theory.security}</div>
          </div>
        </div>
      )}

      {activeTab === 'demo' && <DemoTool cipherId={id} />}
    </div>
  );
}
