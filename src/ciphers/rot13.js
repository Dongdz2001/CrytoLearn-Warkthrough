export function rot13Encrypt(text) {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char >= 'a' ? 97 : 65;
    return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base);
  });
}

export const rot13Decrypt = rot13Encrypt; // ROT13 is its own inverse
