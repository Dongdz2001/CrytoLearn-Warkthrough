export function atbashEncrypt(text) {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char >= 'a' ? 97 : 65;
    return String.fromCharCode(base + (25 - (char.charCodeAt(0) - base)));
  });
}

export const atbashDecrypt = atbashEncrypt; // Atbash is its own inverse
