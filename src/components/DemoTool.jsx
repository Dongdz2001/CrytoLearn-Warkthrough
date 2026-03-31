import { useState } from 'react';
import { caesarEncrypt, caesarDecrypt } from '../ciphers/caesar';
import { vigenereEncrypt, vigenereDecrypt } from '../ciphers/vigenere';
import { atbashEncrypt, atbashDecrypt } from '../ciphers/atbash';
import { rot13Encrypt, rot13Decrypt } from '../ciphers/rot13';
import { xorEncrypt, xorDecrypt } from '../ciphers/xor';
import { aesEncrypt, aesDecrypt } from '../ciphers/aes';
import { desEncrypt, desDecrypt, tripleDesEncrypt, tripleDesDecrypt } from '../ciphers/des';
import { generateKeyPair, rsaEncrypt, rsaDecrypt, rsaSign, rsaVerify } from '../ciphers/rsa';
import { md5Hash, sha1Hash, sha256Hash, sha512Hash } from '../ciphers/hash';
import { base64Encode, base64Decode, textToHex, hexToText, textToBinary, binaryToText } from '../ciphers/base64';

export default function DemoTool({ cipherId }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [key, setKey] = useState('');
  const [shift, setShift] = useState(3);
  const [aesMode, setAesMode] = useState('CBC');
  const [outputFormat, setOutputFormat] = useState('Base64');
  const [desType, setDesType] = useState('DES');
  const [hashType, setHashType] = useState('SHA-256');
  const [encodeType, setEncodeType] = useState('Base64');
  const [rsaKeys, setRsaKeys] = useState(null);
  const [signature, setSignature] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);
  const [copiedField, setCopiedField] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCopy = (text, fieldId) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const CopyButton = ({ text, fieldId }) => (
    <button
      onClick={() => handleCopy(text, fieldId)}
      className="copy-btn"
      title="Copy to clipboard"
      style={{
        background: 'none',
        border: 'none',
        padding: '4px',
        cursor: 'pointer',
        fontSize: '0.8rem',
        color: copiedField === fieldId ? 'var(--accent-green)' : 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        marginLeft: 'auto',
        transition: 'all 0.2s'
      }}
    >
      {copiedField === fieldId ? (
        <>
          <span style={{ fontSize: '0.9rem' }}>✅</span>
          <span>Đã copy</span>
        </>
      ) : (
        <>
          <span style={{ fontSize: '0.9rem' }}>📋</span>
          <span>Copy</span>
        </>
      )}
    </button>
  );

  const handleEncrypt = () => {
    try {
      let result = '';
      switch (cipherId) {
        case 'caesar': result = caesarEncrypt(input, parseInt(shift)); break;
        case 'vigenere': result = vigenereEncrypt(input, key); break;
        case 'atbash': result = atbashEncrypt(input); break;
        case 'rot13': result = rot13Encrypt(input); break;
        case 'xor': result = xorEncrypt(input, key); break;
        case 'aes': result = aesEncrypt(input, key, aesMode, outputFormat); break;
        case 'des':
          result = desType === '3DES' ? tripleDesEncrypt(input, key) : desEncrypt(input, key);
          break;
        case 'rsa':
          if (!rsaKeys) return setOutput('⚠️ Hãy tạo cặp key trước!');
          result = rsaEncrypt(input, rsaKeys.publicKey);
          break;
        default: result = input;
      }
      setOutput(result);
    } catch (e) {
      setOutput('⚠️ Lỗi: ' + e.message);
    }
  };

  const handleDecrypt = () => {
    try {
      let result = '';
      const textToDecode = output || input;
      switch (cipherId) {
        case 'caesar': result = caesarDecrypt(textToDecode, parseInt(shift)); break;
        case 'vigenere': result = vigenereDecrypt(textToDecode, key); break;
        case 'atbash': result = atbashDecrypt(textToDecode); break;
        case 'rot13': result = rot13Decrypt(textToDecode); break;
        case 'xor': result = xorDecrypt(textToDecode, key); break;
        case 'aes': result = aesDecrypt(textToDecode, key, aesMode, outputFormat); break;
        case 'des':
          result = desType === '3DES'
            ? tripleDesDecrypt(textToDecode, key)
            : desDecrypt(textToDecode, key);
          break;
        case 'rsa':
          if (!rsaKeys) return setOutput('⚠️ Hãy tạo cặp key trước!');
          result = rsaDecrypt(textToDecode, rsaKeys.privateKey);
          break;
        default: result = textToDecode;
      }
      setOutput(result);
    } catch (e) {
      setOutput('⚠️ Lỗi: ' + e.message);
    }
  };

  const handleHash = () => {
    let result = '';
    switch (hashType) {
      case 'MD5': result = md5Hash(input); break;
      case 'SHA-1': result = sha1Hash(input); break;
      case 'SHA-256': result = sha256Hash(input); break;
      case 'SHA-512': result = sha512Hash(input); break;
    }
    setOutput(result);
  };

  const handleEncode = () => {
    let result = '';
    switch (encodeType) {
      case 'Base64': result = base64Encode(input); break;
      case 'Hex': result = textToHex(input); break;
      case 'Binary': result = textToBinary(input); break;
    }
    setOutput(result);
  };

  const handleDecode = () => {
    let result = '';
    const textToDecode = output || input;
    switch (encodeType) {
      case 'Base64': result = base64Decode(textToDecode); break;
      case 'Hex': result = hexToText(textToDecode); break;
      case 'Binary': result = binaryToText(textToDecode); break;
    }
    setOutput(result);
  };

  const handleGenerateKeys = () => {
    setLoading(true);
    setTimeout(() => {
      const keys = generateKeyPair(1024);
      setRsaKeys(keys);
      setLoading(false);
    }, 100);
  };

  const handleSign = () => {
    if (!rsaKeys) return setSignature('⚠️ Hãy tạo cặp key trước!');
    const sig = rsaSign(input, rsaKeys.privateKey);
    setSignature(sig);
  };

  const handleVerify = () => {
    if (!rsaKeys) return setVerifyResult(null);
    const result = rsaVerify(input, signature, rsaKeys.publicKey);
    setVerifyResult(result);
  };

  // Hash tools
  if (cipherId === 'hash') {
    return (
      <div className="demo-tool">
        <div className="demo-grid">
          <div className="demo-group full-width">
            <label className="demo-label">Chọn thuật toán Hash</label>
            <div className="toggle-group">
              {['MD5', 'SHA-1', 'SHA-256', 'SHA-512'].map((h) => (
                <button
                  key={h}
                  className={`toggle-option ${hashType === h ? 'active' : ''}`}
                  onClick={() => setHashType(h)}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
          <div className="demo-group">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <label className="demo-label" style={{ marginBottom: 0 }}>Văn bản cần băm</label>
              <CopyButton text={input} fieldId="hash-input" />
            </div>
            <textarea
              className="demo-textarea"
              placeholder="Nhập văn bản..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="demo-group">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <label className="demo-label" style={{ marginBottom: 0 }}>Kết quả Hash ({hashType})</label>
              <CopyButton text={output} fieldId="hash-output" />
            </div>
            <div className="demo-output">{output || 'Kết quả sẽ hiện ở đây...'}</div>
          </div>
          <div className="demo-group full-width">
            <div className="demo-actions">
              <button className="demo-btn primary" onClick={handleHash}>
                #️⃣ Băm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Encoding tools
  if (cipherId === 'base64' || cipherId === 'hex-binary') {
    return (
      <div className="demo-tool">
        <div className="demo-grid">
          {cipherId === 'hex-binary' && (
            <div className="demo-group full-width">
              <label className="demo-label">Chọn loại</label>
              <div className="toggle-group">
                {['Hex', 'Binary'].map((t) => (
                  <button
                    key={t}
                    className={`toggle-option ${encodeType === t ? 'active' : ''}`}
                    onClick={() => setEncodeType(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="demo-group">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <label className="demo-label" style={{ marginBottom: 0 }}>Văn bản</label>
              <CopyButton text={input} fieldId="encode-input" />
            </div>
            <textarea
              className="demo-textarea"
              placeholder="Nhập văn bản..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="demo-group">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <label className="demo-label" style={{ marginBottom: 0 }}>Kết quả</label>
              <CopyButton text={output} fieldId="encode-output" />
            </div>
            <div className="demo-output">{output || 'Kết quả sẽ hiện ở đây...'}</div>
          </div>
          <div className="demo-group full-width">
            <div className="demo-actions">
              <button className="demo-btn primary" onClick={handleEncode}>
                📤 Encode
              </button>
              <button className="demo-btn secondary" onClick={handleDecode}>
                📥 Decode
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RSA Signature
  if (cipherId === 'rsa-signature') {
    return (
      <div className="demo-tool">
        <div className="demo-grid">
          <div className="demo-group full-width">
            <button
              className="demo-btn primary"
              onClick={handleGenerateKeys}
              disabled={loading}
            >
              {loading ? '⏳ Đang tạo key...' : '🔑 Tạo cặp key RSA'}
            </button>
            {rsaKeys && (
              <p style={{ color: 'var(--accent-green)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                ✅ Đã tạo cặp key RSA 1024-bit
              </p>
            )}
          </div>
          <div className="demo-group">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <label className="demo-label" style={{ marginBottom: 0 }}>Thông điệp cần ký</label>
              <CopyButton text={input} fieldId="sig-input" />
            </div>
            <textarea
              className="demo-textarea"
              placeholder="Nhập thông điệp..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="demo-group">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <label className="demo-label" style={{ marginBottom: 0 }}>Chữ ký số</label>
              <CopyButton text={signature} fieldId="sig-output" />
            </div>
            <div className="demo-output">{signature || 'Chữ ký sẽ hiện ở đây...'}</div>
          </div>
          <div className="demo-group full-width">
            <div className="demo-actions">
              <button className="demo-btn primary" onClick={handleSign}>
                ✍️ Ký (Sign)
              </button>
              <button className="demo-btn secondary" onClick={handleVerify}>
                ✅ Xác minh (Verify)
              </button>
            </div>
            {verifyResult !== null && (
              <p style={{
                color: verifyResult ? 'var(--accent-green)' : 'var(--accent-red)',
                marginTop: '0.8rem',
                fontWeight: 600,
              }}>
                {verifyResult ? '✅ Chữ ký hợp lệ!' : '❌ Chữ ký không hợp lệ!'}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2-way encrypt/decrypt (default)
  return (
    <div className="demo-tool">
      <div className="demo-grid">
        {/* Extra controls */}
        {cipherId === 'caesar' && (
          <div className="demo-group full-width">
            <label className="demo-label">Bước dịch chuyển (Shift): {shift}</label>
            <input
              type="range"
              min="1"
              max="25"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-purple)' }}
            />
          </div>
        )}

        {(cipherId === 'vigenere' || cipherId === 'xor') && (
          <div className="demo-group full-width">
            <label className="demo-label">Key (Từ khóa)</label>
            <input
              className="demo-input"
              placeholder="Nhập key..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
        )}

        {(cipherId === 'aes' || cipherId === 'des' || cipherId === 'rsa') && (
          <>
            {cipherId !== 'rsa' && (
              <div className="demo-group full-width">
                <label className="demo-label">Secret Key</label>
                <input
                  className="demo-input"
                  placeholder="Nhập secret key..."
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                />
              </div>
            )}

            {cipherId === 'aes' && (
              <div className="demo-group">
                <label className="demo-label">Encryption Mode</label>
                <div className="toggle-group">
                  {['CBC', 'ECB'].map((m) => (
                    <button
                      key={m}
                      className={`toggle-option ${aesMode === m ? 'active' : ''}`}
                      onClick={() => setAesMode(m)}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {cipherId === 'aes' && (
              <div className="demo-group">
                <label className="demo-label">Output Format</label>
                <div className="toggle-group">
                  {['Base64', 'Hex'].map((f) => (
                    <button
                      key={f}
                      className={`toggle-option ${outputFormat === f ? 'active' : ''}`}
                      onClick={() => setOutputFormat(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {cipherId === 'des' && (
              <div className="demo-group full-width">
                <label className="demo-label">Loại DES</label>
                <div className="toggle-group">
                  {['DES', '3DES'].map((t) => (
                    <button
                      key={t}
                      className={`toggle-option ${desType === t ? 'active' : ''}`}
                      onClick={() => setDesType(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {cipherId === 'rsa' && (
              <div className="demo-group full-width">
                <button
                  className="demo-btn secondary"
                  onClick={handleGenerateKeys}
                  disabled={loading}
                  style={{ maxWidth: 300 }}
                >
                  {loading ? '⏳ Đang tạo...' : '🔑 Tạo cặp key RSA'}
                </button>
                {rsaKeys && (
                  <p style={{ color: 'var(--accent-green)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                    ✅ Đã tạo cặp key RSA 1024-bit
                  </p>
                )}
              </div>
            )}
          </>
        )}

        <div className="demo-group">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <label className="demo-label" style={{ marginBottom: 0 }}>Văn bản gốc (Plaintext)</label>
            <CopyButton text={input} fieldId="plain-input" />
          </div>
          <textarea
            className="demo-textarea"
            placeholder="Nhập văn bản cần mã hóa..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="demo-group">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <label className="demo-label" style={{ marginBottom: 0 }}>Kết quả (Ciphertext)</label>
            <CopyButton text={output} fieldId="cipher-output" />
          </div>
          <div className="demo-output">{output || 'Kết quả sẽ hiện ở đây...'}</div>
        </div>

        <div className="demo-group full-width">
          <div className="demo-actions">
            <button className="demo-btn primary" onClick={handleEncrypt}>
              🔒 Mã hóa
            </button>
            <button className="demo-btn secondary" onClick={handleDecrypt}>
              🔓 Giải mã
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
