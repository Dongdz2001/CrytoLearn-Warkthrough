import CryptoJS from 'crypto-js';

export function desEncrypt(text, key) {
  return CryptoJS.DES.encrypt(text, key).toString();
}

export function desDecrypt(ciphertext, key) {
  try {
    const bytes = CryptoJS.DES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8) || '⚠️ Không thể giải mã';
  } catch {
    return '⚠️ Lỗi giải mã';
  }
}

export function tripleDesEncrypt(text, key) {
  return CryptoJS.TripleDES.encrypt(text, key).toString();
}

export function tripleDesDecrypt(ciphertext, key) {
  try {
    const bytes = CryptoJS.TripleDES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8) || '⚠️ Không thể giải mã';
  } catch {
    return '⚠️ Lỗi giải mã';
  }
}
