export function base64Encode(text) {
  try {
    return btoa(unescape(encodeURIComponent(text)));
  } catch {
    return '⚠️ Lỗi encode';
  }
}

export function base64Decode(encoded) {
  try {
    return decodeURIComponent(escape(atob(encoded)));
  } catch {
    return '⚠️ Chuỗi Base64 không hợp lệ';
  }
}

export function textToHex(text) {
  return Array.from(text).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
}

export function hexToText(hex) {
  try {
    return hex.split(' ').filter(Boolean).map(h => String.fromCharCode(parseInt(h, 16))).join('');
  } catch {
    return '⚠️ Hex không hợp lệ';
  }
}

export function textToBinary(text) {
  return Array.from(text).map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
}

export function binaryToText(binary) {
  try {
    return binary.split(' ').filter(Boolean).map(b => String.fromCharCode(parseInt(b, 2))).join('');
  } catch {
    return '⚠️ Binary không hợp lệ';
  }
}
