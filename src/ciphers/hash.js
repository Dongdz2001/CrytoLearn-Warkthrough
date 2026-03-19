import CryptoJS from 'crypto-js';

export function md5Hash(text) {
  return CryptoJS.MD5(text).toString();
}

export function sha1Hash(text) {
  return CryptoJS.SHA1(text).toString();
}

export function sha256Hash(text) {
  return CryptoJS.SHA256(text).toString();
}

export function sha512Hash(text) {
  return CryptoJS.SHA512(text).toString();
}
