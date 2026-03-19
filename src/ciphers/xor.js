export function xorEncrypt(text, key) {
  if (!key) return text;
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  // Return as hex string for readability
  return Array.from(result).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
}

export function xorDecrypt(hexString, key) {
  if (!key) return hexString;
  const bytes = hexString.split(' ').map(h => parseInt(h, 16));
  let result = '';
  for (let i = 0; i < bytes.length; i++) {
    result += String.fromCharCode(bytes[i] ^ key.charCodeAt(i % key.length));
  }
  return result;
}
