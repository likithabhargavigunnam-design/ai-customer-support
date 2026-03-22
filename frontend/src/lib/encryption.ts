export class EncryptionService {
  private static ALGORITHM = 'AES-GCM';

  static async generateKey(): Promise<CryptoKey> {
    return await window.crypto.subtle.generateKey(
      {
        name: this.ALGORITHM,
        length: 256,
      },
      true,
      ['encrypt', 'decrypt']
    );
  }

  static async encrypt(text: string, key: CryptoKey): Promise<{ ciphertext: ArrayBuffer; iv: Uint8Array }> {
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const ciphertext = await window.crypto.subtle.encrypt(
      {
        name: this.ALGORITHM,
        iv: iv,
      } as AesGcmParams,
      key,
      data
    );

    return { ciphertext, iv };
  }

  static async decrypt(ciphertext: ArrayBuffer, key: CryptoKey, iv: Uint8Array): Promise<string> {
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: this.ALGORITHM,
        iv: iv,
      } as AesGcmParams,
      key,
      ciphertext
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  }

  // Helper to export key as string (for storage/sharing in demo)
  static async exportKey(key: CryptoKey): Promise<string> {
    const exported = await window.crypto.subtle.exportKey('raw', key);
    return btoa(String.fromCharCode(...new Uint8Array(exported)));
  }

  // Helper to import key from string
  static async importKey(keyStr: string): Promise<CryptoKey> {
    const binary = atob(keyStr);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    return await window.crypto.subtle.importKey(
      'raw',
      bytes,
      this.ALGORITHM,
      true,
      ['encrypt', 'decrypt']
    );
  }
}
