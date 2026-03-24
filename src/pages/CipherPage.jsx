import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

import { getCipherById } from '../data/ciphers';
import theories from '../data/theories';
import DemoTool from '../components/DemoTool';
import AlphabetTable from '../components/AlphabetTable';
import XorTable from '../components/XorTable';

export default function CipherPage() {
  const { id } = useParams();
  const cipher = getCipherById(id);
  const theory = theories[id];
  const [activeTab, setActiveTab] = useState('theory');
  const [userAnswer, setUserAnswer] = useState('');
  const [checkResult, setCheckResult] = useState('idle'); // 'idle' | 'correct' | 'incorrect'
  const [showExplanation, setShowExplanation] = useState(false);
  const [shiftK, setShiftK] = useState(3);

  const getShiftedAlphabet = (k) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const numK = parseInt(k) || 0;
    const shift = ((numK % 26) + 26) % 26;
    return [...alphabet.slice(shift), ...alphabet.slice(0, shift)];
  };

  useEffect(() => {
    setUserAnswer('');
    setCheckResult('idle');
    setShowExplanation(false);
  }, [id, activeTab]);

  const handleCheckAnswer = () => {
    if (!theory?.practice) return;
    const correctAns = theory.practice.answer.toString().toLowerCase().trim();
    const userAns = userAnswer.toString().toLowerCase().trim();
    if (userAns === correctAns) {
      setCheckResult('correct');
    } else {
      setCheckResult('incorrect');
    }
  };

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
        <div className="cipher-detail-icon">{cipher.icon}</div>
        <div>
          <h2 className="cipher-detail-title">{theory.title}</h2>
          <div className="cipher-detail-category">
            Thuật toán: {cipher.name} • {cipher.category === 'classic' ? 'Mật mã cổ điển' : cipher.category === 'modern' ? 'Mật mã hiện đại' : 'Mật mã khóa công khai'}
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
          🧪 Demo & Thực hành
        </button>
      </div>

      {activeTab === 'theory' && (
        <>
          <div className="theory-content academic-paper">
            <div className="academic-header">
              <h1 className="academic-title">{theory.title}</h1>
              <div className="academic-metadata">
                <span>Lĩnh vực: Mật mã học (Cryptography)</span>
                <span>•</span>
                <span>Ngày: {new Date().toLocaleDateString('vi-VN')}</span>
              </div>
            </div>

            <div className="academic-section markdown-body block" style={{marginBottom: "20px"}}>
              <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{theory.history}</ReactMarkdown>
            </div>

            <div className="academic-section">
              <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{theory.howItWorks}</ReactMarkdown>
              
              {(id === 'caesar' || id === 'vigenere' || id === 'atbash') && (
                <div style={{ margin: '30px 0', padding: '20px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '15px', fontSize: '0.9rem', fontFamily: 'var(--font-primary)' }}>
                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>**Bảng tra cứu tham chiếu (Reference Lookup Table):**</ReactMarkdown>
                  </div>
                  <AlphabetTable />
                  
                  {id === 'caesar' && (
                    <div style={{ marginTop: '25px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                        <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1rem', fontFamily: 'var(--font-academic)' }}>
                          <ReactMarkdown 
                            remarkPlugins={[remarkMath]} 
                            rehypePlugins={[rehypeKatex]}
                            components={{ p: ({node, ...props}) => <span {...props} /> }}
                          >
                            {`🔄 Bảng dịch chuẩn (Khóa $k = $`}
                          </ReactMarkdown>
                        </div>
                        <input 
                          type="number" 
                          value={shiftK}
                          onChange={(e) => setShiftK(e.target.value)}
                          style={{ 
                            width: '55px', 
                            height: '32px',
                            padding: '0 8px', 
                            borderRadius: '6px', 
                            border: '1px solid #cbd5e1',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            color: '#0f172a',
                            textAlign: 'center',
                            backgroundColor: '#fff',
                            outline: 'none',
                          }}
                        />
                        <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1rem', fontFamily: 'var(--font-academic)' }}>
                          <ReactMarkdown 
                            remarkPlugins={[remarkMath]} 
                            rehypePlugins={[rehypeKatex]}
                            components={{ p: ({node, ...props}) => <span {...props} /> }}
                          >
                            {`):`}
                          </ReactMarkdown>
                        </div>
                      </div>
                      <AlphabetTable 
                        bottomData={getShiftedAlphabet(shiftK)} 
                      />
                    </div>
                  )}

                  {id === 'atbash' && (
                    <div style={{ marginTop: '25px' }}>
                      <div style={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '12px', fontSize: '0.9rem', fontFamily: 'var(--font-primary)' }}>
                        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>🔀 Bảng tra cứu lật ngược (Atbash Lookup Table):</ReactMarkdown>
                      </div>
                      <AlphabetTable 
                        bottomData={"ZYXWVUTSRQPONMLKJIHGFEDCBA".split("")} 
                      />
                    </div>
                  )}
                </div>
              )}

              {(id === 'xor' || id === 'des' || id === 'aes') && (
                <div style={{ margin: '30px 0', padding: '20px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '15px', fontSize: '0.9rem', fontFamily: 'var(--font-primary)' }}>
                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>📑 Bảng Chân lý XOR (Bitwise XOR Truth Table):</ReactMarkdown>
                  </div>
                  <XorTable />
                </div>
              )}
            </div>

            <div className="academic-section">
              <div className="security-badge">
                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{theory.security}</ReactMarkdown>
              </div>
            </div>

            <div className="academic-footer">
              Bản quyền tài liệu © {new Date().getFullYear()} CryptoLearn Project. Tài liệu lưu hành nội bộ.
            </div>
          </div>

          {theory.practice && (
            <div className="theory-section practice-section fade-in" style={{ 
              marginTop: '40px', 
              padding: '25px', 
              background: 'linear-gradient(145deg, #1e293b, #0f172a)', 
              borderRadius: '16px', 
              border: '1px solid rgba(34, 211, 238, 0.2)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}>
              <h3 style={{ marginTop: 0, color: '#22d3ee', textShadow: '0 0 10px rgba(34, 211, 238, 0.3)' }}>🎯 Bài tập thực hành</h3>
              {(id === 'caesar' || id === 'vigenere' || id === 'atbash') && (
                <div style={{ marginBottom: '25px' }}>
                  <p style={{ fontSize: '0.95rem', color: '#94a3b8', marginBottom: '12px' }}>💡 Gợi ý: Sử dụng bảng tra cứu bên dưới để tính toán:</p>
                  <AlphabetTable />
                </div>
              )}
              <div className="markdown-body block" style={{ backgroundColor: 'transparent', padding: 0, color: '#e2e8f0' }}>
                 <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{theory.practice.question}</ReactMarkdown>
              </div>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                <input 
                  type="text" 
                  value={userAnswer}
                  onChange={(e) => {
                     setUserAnswer(e.target.value);
                     setCheckResult('idle');
                  }}
                  placeholder="Nhập đáp án của bạn..."
                  style={{ 
                    flex: 1, 
                    padding: '12px 15px', 
                    borderRadius: '8px', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    outline: 'none', 
                    fontSize: '1rem' 
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheckAnswer()}
                />
                <button 
                   onClick={handleCheckAnswer}
                   style={{ 
                     padding: '12px 25px', 
                     backgroundColor: '#22d3ee', 
                     color: '#0f172a', 
                     border: 'none', 
                     borderRadius: '8px', 
                     cursor: 'pointer', 
                     fontWeight: 'bold',
                     transition: 'all 0.2s ease'
                   }}
                >
                  Kiểm tra
                </button>
              </div>

              {checkResult === 'correct' && (
                <div style={{ marginTop: '15px', color: '#00b894', fontWeight: 'bold' }}>
                  ✅ Chính xác! Tuyệt vời!
                </div>
              )}

              {checkResult === 'incorrect' && (
                <div style={{ marginTop: '15px', color: '#d63031' }}>
                  ❌ Chưa đúng rồi. Đáp án đúng là: <strong>{theory.practice.answer}</strong>
                </div>
              )}

              {(checkResult === 'correct' || checkResult === 'incorrect') && (
                <div style={{ marginTop: '15px' }}>
                  <button 
                    onClick={() => setShowExplanation(!showExplanation)}
                    style={{ background: 'none', border: 'none', color: '#0984e3', textDecoration: 'underline', cursor: 'pointer', padding: 0, fontSize: '0.9rem' }}
                  >
                    {showExplanation ? 'Ẩn lời giải' : 'Xem lời giải chi tiết ▾'}
                  </button>
                  
                  {showExplanation && (
                    <div className="markdown-body block fade-in" style={{ 
                      marginTop: '10px', 
                      padding: '15px', 
                      backgroundColor: '#fff', 
                      color: '#1e293b', 
                      borderLeft: '4px solid #0984e3', 
                      borderRadius: '4px', 
                      boxShadow: '0 2px 5px rgba(0,0,0,0.05)' 
                    }}>
                       <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{theory.practice.explanation}</ReactMarkdown>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {activeTab === 'demo' && <DemoTool cipherId={id} />}
    </div>
  );
}
