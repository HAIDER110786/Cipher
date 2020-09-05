import {authentication} from '../helperFiles/Authentication.js';
import {
    encryptionPlainText, 
    encryptionCipherText, 
    key,
    decryptionPlainText,
    decryptionCipherText,
} from '../helperFiles/ElementSelector.js';

export class SubstitutionCipher{

    static encryption()
    {
        if(key.value.trim() === '' )
        {
            alert('enter a key for this cipher');
        }
        else
        {
            let validSubstitutionKey = /[A-Za-z]/. test((key.value.trim()).replace(/\s/g,''));
            if(validSubstitutionKey){
                let SubstitutionKey = key.value.trim().toUpperCase();
                if( SubstitutionKey.length !== 26 || !/^[a-z]+$/i. test(SubstitutionKey) || SubstitutionCipher.duplicateKey(SubstitutionKey)){
                    alert("the key length must 26 and the key must be all unique");
                    return;
                }
                key.value = SubstitutionKey;
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

                    for (let iteration = 0; iteration < valueToDecrypt.length; iteration++)
                    {
                        const index = alphabetArray.indexOf(valueToDecrypt[iteration]);
                        encryptedTextArray.push(SubstitutionKey[index]);
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
            let validSubstitutionKey = /[A-Za-z]/. test((key.value.trim()).replace(/\s/g,''));
            if(validSubstitutionKey){
                let SubstitutionKey = key.value.trim().toUpperCase();
                if( SubstitutionKey.length !== 26 || !/^[a-z]+$/i. test(SubstitutionKey) || SubstitutionCipher.duplicateKey(SubstitutionKey)){
                    alert("the key length must 26 and the key must be all unique");
                    return;
                }
                key.value = SubstitutionKey;
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

                    for (let iteration = 0; iteration < valueToEncrypt.length; iteration++)
                    {
                        const index = SubstitutionKey.indexOf(valueToEncrypt[iteration]);
                        decryptedTextArray.push(alphabetArray[index]);
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

    static duplicateKey(key){
        const uniqueKeys = [];
        uniqueKeys.push(key[0]);
        for (let i = 1; i < key.length; i++){
            for (let j = 0; j < uniqueKeys.length; j++){
                if( key[i] == uniqueKeys[j] ){
                    return true;
                }
            }
            uniqueKeys.push(key[i]);
        }
        return false;
    }
}