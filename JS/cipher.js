const cipherSelected = document.querySelector('.cipherDiv .cipherSelectionAndkeyIfAny .cipherSelection select');
const key = document.querySelector('.cipherDiv .cipherSelectionAndkeyIfAny .key input');
const encryptionPlainText = document.querySelector('.encryption .plainText input');
const encryptButton = document.querySelector('.encryption .encryptionButton button');
const encryptionCipherText = document.querySelector('.encryption .cipherText input');
const decryptionCipherText = document.querySelector('.decryption .cipherText input');
const decryptButton = document.querySelector('.decryption .decryptionButton button');
const decryptionPlainText = document.querySelector('.decryption .plainText input');

console.log({cipherSelected,key,encryptionPlainText,encryptButton,encryptionCipherText,decryptionCipherText,decryptButton,decryptionPlainText});