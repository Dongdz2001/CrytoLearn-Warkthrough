import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_SECRET_KEY || 'default-secret-key-123';

// Derive a fixed 256-bit key and 128-bit IV base from the secret using SHA-256
const KEY = CryptoJS.enc.Utf8.parse(
  CryptoJS.SHA256(SECRET_KEY).toString(CryptoJS.enc.Hex).substring(0, 32)
);

/**
 * Encrypts data using AES-CBC with PKCS7 padding.
 * A random IV is generated for each encryption call and prepended to the ciphertext.
 * Format: "<iv_hex>:<ciphertext_base64>"
 *
 * @param {any} data - The data to encrypt (will be JSON-stringified if not a string).
 * @returns {string} - The encrypted string in "<iv_hex>:<ciphertext_base64>" format.
 */
export const encryptData = (data) => {
  const jsonStr = typeof data === 'string' ? data : JSON.stringify(data);

  // Generate a random 128-bit IV for each encryption
  const iv = CryptoJS.lib.WordArray.random(16);

  const encrypted = CryptoJS.AES.encrypt(jsonStr, KEY, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // Prepend IV (hex) to ciphertext (base64) so it can be used during decryption
  return iv.toString(CryptoJS.enc.Hex) + ':' + encrypted.toString();
};

/**
 * Decrypts data that was encrypted with encryptData() using AES-CBC + PKCS7.
 * Expects format: "<iv_hex>:<ciphertext_base64>"
 *
 * @param {string} ciphertext - The encrypted string.
 * @returns {any} - The decrypted data (parsed as JSON if possible), or null on failure.
 */
export const decryptData = (ciphertext) => {
  if (!ciphertext) return null;

  try {
    const [ivHex, encryptedData] = ciphertext.split(':');

    if (!ivHex || !encryptedData) {
      console.error('Decryption failed: invalid ciphertext format');
      return null;
    }

    const iv = CryptoJS.enc.Hex.parse(ivHex);

    const decrypted = CryptoJS.AES.decrypt(encryptedData, KEY, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);

    if (!decryptedStr) {
      console.error('Decryption failed: empty result (wrong key or corrupted data)');
      return null;
    }

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
