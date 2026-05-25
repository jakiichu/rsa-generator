const pemToArrayBuffer = (pem: string): ArrayBuffer => {
  // Strip any PEM header/footer lines, then keep only valid base64 chars
  const base64 = pem
    .replace(/-----[^-]+-----/g, '')
    .replace(/[^A-Za-z0-9+/=]/g, '');
  const binary = atob(base64);
  const buffer = new ArrayBuffer(binary.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) {
    view[i] = binary.charCodeAt(i);
  }
  return buffer;
};

export const importRsaPublicKey = async (pemKey: string): Promise<CryptoKey> => {
  const keyData = pemToArrayBuffer(pemKey);
  return crypto.subtle.importKey(
    'spki',
    keyData,
    { name: 'RSA-OAEP', hash: 'SHA-256' },
    false,
    ['encrypt'],
  );
};

export const encryptWithRsa = async (plaintext: string, pemKey: string): Promise<string> => {
  const key = await importRsaPublicKey(pemKey);
  const encoded = new TextEncoder().encode(plaintext);
  const encrypted = await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, key, encoded);
  const bytes = new Uint8Array(encrypted);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};
