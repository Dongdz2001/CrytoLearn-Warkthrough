import CryptoJS from 'crypto-js';

export function aesEncrypt(text, key, mode = 'CBC', outputFormat = 'Base64') {
  const config = {
    mode: mode === 'ECB' ? CryptoJS.mode.ECB : CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  };
  const encrypted = CryptoJS.AES.encrypt(text, key, config);
  if (outputFormat === 'Hex') {
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
  }
  return encrypted.toString(); // Base64 by default
}

export function aesDecrypt(ciphertext, key, mode = 'CBC', inputFormat = 'Base64') {
  try {
    const config = {
      mode: mode === 'ECB' ? CryptoJS.mode.ECB : CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    };
    const decrypted = CryptoJS.AES.decrypt(ciphertext, key, config);
    return decrypted.toString(CryptoJS.enc.Utf8) || '⚠️ Không thể giải mã (sai key hoặc mode)';
  } catch {
    return '⚠️ Lỗi giải mã';
  }
}
