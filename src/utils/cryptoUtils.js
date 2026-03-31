import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_SECRET_KEY || 'default-secret-key-123';

/**
 * Encrypts data using AES algorithm.
 * @param {any} data - The data to encrypt (will be stringified if object).
 * @returns {string} - The encrypted ciphertext.
 */
export const encryptData = (data) => {
  const jsonStr = typeof data === 'string' ? data : JSON.stringify(data);
  return CryptoJS.AES.encrypt(jsonStr, SECRET_KEY).toString();
};

/**
 * Decrypts data using AES algorithm.
 * @param {string} ciphertext - The ciphertext to decrypt.
 * @returns {any} - The decrypted data (parsed as JSON if possible).
 */
export const decryptData = (ciphertext) => {
  if (!ciphertext) return null;
  
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);
    
    try {
      return JSON.parse(decryptedStr);
    } catch {
      return decryptedStr;
    }
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
};
