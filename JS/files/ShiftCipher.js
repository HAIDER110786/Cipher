import {authentication} from '../helperFiles/Authentication.js';
import {
    encryptionPlainText, 
    encryptionCipherText, 
    key,
    decryptionPlainText,
    decryptionCipherText,
} from '../helperFiles/ElementSelector.js';

export class ShiftCipher{

    static encryption()
    {
        if( key.value === '' )
        {
            alert('enter a key for this cipher');
        }
        else
        {
            if( parseInt(key.value) || parseInt(key.value) === 0 )
            {
                if( parseInt(key.value) >= 0 && parseInt(key.value) <= 25 )
                { 
                    let shiftCipherKey = parseInt(key.value);
                    let valueToDecrypt = encryptionPlainText.value.trim();
                    if(valueToDecrypt){
                        
                        valueToDecrypt = authentication.removeSpacesFromInBetween(valueToDecrypt);

                        const localAuth = new authentication(valueToDecrypt)

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

                        for (let iteration = 0; iteration <= valueToDecrypt.length-1; iteration++){
                            let index = alphabetArray.indexOf(valueToDecrypt[iteration]);
                            const correspondingCipherAlphabet = (index+shiftCipherKey)%26;
                            encryptedTextArray.push(alphabetArray[correspondingCipherAlphabet]);
                        }
                        encryptionCipherText.value = encryptedTextArray.join('');
                    }
                    else{
                        alert('enter something to decrypt!');
                    }
                }
                else
                {
                    alert('the number must be in between or exactly 0 and 25');
                }
            }
            else
            {
                alert('enter a number in the key for this shift cipher');
            }
        }
    }

    static decryption(){
        if( key.value === '' )
        {
            alert('enter a key for this cipher');
        }
        else
        {
            if( parseInt(key.value) || parseInt(key.value) === 0 )
            {
                if( parseInt(key.value) >= 0 && parseInt(key.value) <= 25 )
                { 
                    let shiftKey = key.value;
                    let valueToDecrypt = decryptionCipherText.value.trim();
                    if(valueToDecrypt){
                        
                        valueToDecrypt = authentication.removeSpacesFromInBetween(valueToDecrypt);

                        const localAuth = new authentication(valueToDecrypt)

                        if(localAuth.anyAntiAlphabets()){
                            alert('Only alphabets are allowed in the cipher text');
                            return;
                        }

                        if(localAuth.anySmallAlphabets()){
                            // alert('Enter your cipher text in CAPs here we have done that for you');
                            valueToDecrypt = valueToDecrypt.toUpperCase();
                        }

                        decryptionCipherText.value = valueToDecrypt;

                        let alphabetArray = [];
                        let encryptedTextArray = [];
                        for (let i = 65 ; i <= 90 ; i++ ) alphabetArray.push(String.fromCharCode(i));

                        for (let iteration = 0; iteration <= valueToDecrypt.length-1; iteration++){
                            let index = alphabetArray.indexOf(valueToDecrypt[iteration]);
                            const correspondingPlainAlphabet = (index-shiftKey) < 0 ? ( alphabetArray.length + (index - shiftKey) ) : ( index - shiftKey );
                            encryptedTextArray.push(alphabetArray[correspondingPlainAlphabet]);
                        }
                        decryptionPlainText.value = encryptedTextArray.join('');
                    }
                    else{
                        alert('enter something to decrypt!');
                    }
                }
                else
                {
                    alert('the number must be in between or exactly 0 and 25');
                }
            }
            else
            {
                alert('enter a number in the key for this shift cipher');
            }
        }
    }
}