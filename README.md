# my-crypto-tool

A lightweight Node.js utility for AES-256-CBC encryption and decryption of strings, numbers, or objects using a secret key.

---

## 🔐 Features

- AES-256-CBC encryption
- Handles strings, numbers, and objects
- Simple API
- Secure key hashing using SHA-256

---

## 📦 Installation

```bash
npm install my-crypto-tool
```

```bash
const MyCrypto = require('my-crypto-tool');

const secret_key = process.env.SECRET_KEY || 'my_key';
const myCrypto = new MyCrypto(secret_key);

// Example can be object, string, or number
// const example = { name: 'John Doe', age: 30 };
// const example = "hello";
// const example = 8890;

const example = { name: 'John Doe', age: 30 };

// Encrypt
const encrypted = myCrypto.encrypt(example);
console.log('Encrypted:', encrypted);

// Decrypt
const decrypted = myCrypto.decrypt(encrypted);
console.log('Decrypted:', decrypted);
