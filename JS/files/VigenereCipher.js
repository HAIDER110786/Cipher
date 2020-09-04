import {authentication} from '../helperFiles/Authentication.js';
import {
    encryptionPlainText, 
    encryptionCipherText, 
    key,
    decryptionPlainText,
    decryptionCipherText,
} from '../helperFiles/ElementSelector.js';

export class VigenereCipher{

    static encryption()
    {
        if(key.value.trim() === '' )
        {
            alert('enter a key for this cipher');
        }
        else
        {
            let validVigenereKey = /[A-Za-z]/. test((key.value.trim()).replace(/\s/g,''));
            if(validVigenereKey){
                let VigenereKey = key.value.trim().toUpperCase();
                key.value = VigenereKey;
                let valueToDecrypt = encryptionPlainText.value.trim();
                if(valueToDecrypt){
                    
                    valueToDecrypt = authentication.removeSpacesFromInBetween(valueToDecrypt);
                    
                    const localAuth = new authentication(valueToDecrypt);
                    
                    if(localAuth.anyAntiAlphabets()){
                        alert('Only alphabets are allowed in the plain text');
                        return;
                    }
                    
                    if(localAuth.anySmallAlphabets()){
                        // alert('Enter your plain text in CAPs here we have done that for you');
                        valueToDecrypt = valueToDecrypt.toUpperCase();
                    }

                    encryptionPlainText.value = valueToDecrypt;

                    let alphabetArray = [];
                    let encryptedTextArray = [];
                    for (let i = 65 ; i <= 90 ; i++ ) alphabetArray.push(String.fromCharCode(i));

                    for (let iteration = 0; iteration <= valueToDecrypt.length-1; iteration = iteration + VigenereKey.length)
                    {
                        let iteration2 = iteration;
                        while ( iteration2 < iteration + VigenereKey.length && iteration2 < valueToDecrypt.length)
                        {
                            let index = alphabetArray.indexOf(valueToDecrypt[iteration2])+alphabetArray.indexOf(VigenereKey[iteration2 % VigenereKey.length]);
                            const correspondingCipherAlphabet = index % 26 ;
                            encryptedTextArray.push(alphabetArray[correspondingCipherAlphabet]);
                            iteration2++;
                        }
                    }
                    encryptionCipherText.value = encryptedTextArray.join('');
                }
                else{
                    alert('enter something to decrypt!');
                }
            }
            else{
                alert('the key must be all alphabets only in this vigenere cipher');
            }
        }
    }

    static decryption()
    {
        if(key.value.trim() === '' )
        {
            alert('enter a key for this cipher');
        }
        else
        {
            let validVigenereKey = /[A-Za-z]/. test((key.value.trim()).replace(/\s/g,''));
            if(validVigenereKey){
                let VigenereKey = key.value.trim().toUpperCase();
                key.value = VigenereKey;
                let valueToEncrypt = decryptionCipherText.value.trim();
                if(valueToEncrypt){
                    
                    valueToEncrypt = authentication.removeSpacesFromInBetween(valueToEncrypt);
                    
                    const localAuth = new authentication(valueToEncrypt);
                    
                    if(localAuth.anyAntiAlphabets()){
                        alert('Only alphabets are allowed in the plain text');
                        return;
                    }
                    
                    if(localAuth.anySmallAlphabets()){
                        // alert('Enter your plain text in CAPs here we have done that for you');
                        valueToEncrypt = valueToEncrypt.toUpperCase();
                    }
                    
                    decryptionCipherText.value = valueToEncrypt;

                    let alphabetArray = [];
                    let decryptedTextArray = [];
                    for (let i = 65 ; i <= 90 ; i++ ) alphabetArray.push(String.fromCharCode(i));

                    for (let iteration = 0; iteration <= valueToEncrypt.length-1; iteration = iteration + VigenereKey.length)
                    {
                        let iteration2 = iteration;
                        while ( iteration2 < iteration + VigenereKey.length && iteration2 < valueToEncrypt.length)
                        {
                            let index = alphabetArray.indexOf(valueToEncrypt[iteration2])-alphabetArray.indexOf(VigenereKey[iteration2 % VigenereKey.length]);
                            const correspondingCipherAlphabet = (index<0?(alphabetArray.length+index):(index));
                            decryptedTextArray.push(alphabetArray[correspondingCipherAlphabet]);
                            iteration2++;
                        }
                    }
                    decryptionPlainText.value = decryptedTextArray.join('');
                }
                else{
                    alert('enter something to decrypt!');
                }
            }
            else{
                alert('the key must be all alphabets only in this vigenere cipher');
            }
        }
    }
}