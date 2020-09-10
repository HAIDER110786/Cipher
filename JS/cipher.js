import {ShiftCipher} from './files/ShiftCipher.js';
import {VigenereCipher} from './files/VigenereCipher.js';
import {SubstitutionCipher} from './files/SubstitutionCipher.js';
import {PlayFairCipher} from './files/PlayFairCipher.js';
import {RailFenceCipher} from './files/RailFenceCipher.js';
import {
    encryptButton,
    decryptButton,
    cipherSelected
} from './helperFiles/ElementSelector.js';

encryptButton.addEventListener('click',encrypt);
decryptButton.addEventListener('click',decrypt);

function encrypt(){
    switch(cipherSelected.value)
    {
        case "Shift":
            ShiftCipher.encryption();
            break;
        case "Vigenere":
            VigenereCipher.encryption();
            break;
        case "Substitution":
            SubstitutionCipher.encryption();
            break;
        case "PlayFair":
            PlayFairCipher.encryption();
            break;
        case "RailFence":
            RailFenceCipher.encryption();
            break;
    }
}

function decrypt(){
    switch(cipherSelected.value)
    {
        case "Shift":
            ShiftCipher.decryption();
            break;
        case "Vigenier":
            VigenereCipher.decryption();
            break;
        case "Substitution":
            SubstitutionCipher.decryption();
            break;
        case "PlayFair":
            PlayFairCipher.decryption();
            break;
        case "RailFence":
            RailFenceCipher.decryption();
            break;
    }
}
//https://stackoverflow.com/questions/22937618/reference-what-does-this-regex-mean
//https://regex101.com/r/mDUB8E/1