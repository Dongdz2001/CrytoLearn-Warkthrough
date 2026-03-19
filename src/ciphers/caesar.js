export function caesarEncrypt(text, shift) {
  shift = ((shift % 26) + 26) % 26;
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char >= 'a' ? 97 : 65;
    return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
  });
}

export function caesarDecrypt(text, shift) {
  return caesarEncrypt(text, 26 - (shift % 26));
}
