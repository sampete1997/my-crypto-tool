// index.js
const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;

class MyCrypto {
  constructor(secret = 'my_key') {
    this.secret = crypto.createHash('sha256').update(secret).digest();
  }

  encrypt(data) {
    try {
      const iv = crypto.randomBytes(IV_LENGTH);
      const cipher = crypto.createCipheriv(ALGORITHM, this.secret, iv);
      const jsonString = JSON.stringify(data);
      const encrypted = Buffer.concat([
        cipher.update(jsonString, 'utf8'),
        cipher.final()
      ]);
      return iv.toString('hex') + ':' + encrypted.toString('hex');
    } catch (err) {
      console.error('Encryption failed:', err.message);
      return null;
    }
  }

  decrypt(encryptedText) {
    try {
      const [ivHex, encryptedHex] = encryptedText.split(':');
      if (!ivHex || !encryptedHex) throw new Error('Invalid format');
      const iv = Buffer.from(ivHex, 'hex');
      const encrypted = Buffer.from(encryptedHex, 'hex');
      const decipher = crypto.createDecipheriv(ALGORITHM, this.secret, iv);
      const decrypted = Buffer.concat([
        decipher.update(encrypted),
        decipher.final()
      ]);
      return JSON.parse(decrypted.toString('utf8'));
    } catch (err) {
      console.error('Decryption failed:', err.message);
      return null;
    }
  }
}

module.exports = MyCrypto;
