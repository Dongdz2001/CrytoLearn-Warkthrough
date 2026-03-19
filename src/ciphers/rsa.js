import forge from 'node-forge';

let cachedKeyPair = null;

export function generateKeyPair(bits = 1024) {
  const keypair = forge.pki.rsa.generateKeyPair({ bits, e: 0x10001 });
  cachedKeyPair = keypair;
  return {
    publicKey: forge.pki.publicKeyToPem(keypair.publicKey),
    privateKey: forge.pki.privateKeyToPem(keypair.privateKey),
  };
}

export function rsaEncrypt(text, publicKeyPem) {
  try {
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const encrypted = publicKey.encrypt(forge.util.encodeUtf8(text), 'RSA-OAEP');
    return forge.util.encode64(encrypted);
  } catch (e) {
    return '⚠️ Lỗi mã hóa: ' + e.message;
  }
}

export function rsaDecrypt(ciphertext, privateKeyPem) {
  try {
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    const decoded = forge.util.decode64(ciphertext);
    const decrypted = privateKey.decrypt(decoded, 'RSA-OAEP');
    return forge.util.decodeUtf8(decrypted);
  } catch (e) {
    return '⚠️ Lỗi giải mã: ' + e.message;
  }
}

export function rsaSign(message, privateKeyPem) {
  try {
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    const md = forge.md.sha256.create();
    md.update(message, 'utf8');
    const signature = privateKey.sign(md);
    return forge.util.encode64(signature);
  } catch (e) {
    return '⚠️ Lỗi ký: ' + e.message;
  }
}

export function rsaVerify(message, signature, publicKeyPem) {
  try {
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const md = forge.md.sha256.create();
    md.update(message, 'utf8');
    const decodedSig = forge.util.decode64(signature);
    return publicKey.verify(md.digest().bytes(), decodedSig);
  } catch {
    return false;
  }
}
