export function vigenereEncrypt(text, key) {
  if (!key) return text;
  key = key.toLowerCase();
  let keyIndex = 0;
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char >= 'a' ? 97 : 65;
    const shift = key.charCodeAt(keyIndex % key.length) - 97;
    keyIndex++;
    return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
  });
}

export function vigenereDecrypt(text, key) {
  if (!key) return text;
  key = key.toLowerCase();
  let keyIndex = 0;
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char >= 'a' ? 97 : 65;
    const shift = key.charCodeAt(keyIndex % key.length) - 97;
    keyIndex++;
    return String.fromCharCode(((char.charCodeAt(0) - base - shift + 26) % 26) + base);
  });
}
