import {authentication} from '../helperFiles/Authentication.js';
import {
    encryptionPlainText, 
    encryptionCipherText, 
    key,
    decryptionPlainText,
    decryptionCipherText,
} from '../helperFiles/ElementSelector.js';

export class RailFenceCipher{

    static encryption()
    {
        if(key.value.trim() === '' )
        {
            alert('enter a key for this cipher');
        }
        else
        {
            if( parseInt(key.value) || parseInt(key.value) > 0 ) 
            {
                let RailFenceCipherKey = parseInt(key.value);
                let valueToDecrypt = encryptionPlainText.value.trim();
                if(valueToDecrypt)
                {
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

                    let decryptedTextArray = [];

                    let i;
                    let sp = 0;
                    let aid = false;
                    let m1 = (RailFenceCipherKey * 2) - 2 ;
                    let m2 = 0;
                    let t = 1;
            
                    while(m1 >= 0 && aid === false){

                        i = sp;                           
                        decryptedTextArray.push(valueToDecrypt[i]);
                        if(m1 === 0){
                            m1 = (RailFenceCipherKey * 2) - 2;
                            aid = true;
                        }
                            
                        i = i + m1;

                        while (i < valueToDecrypt.length)
                        {
                            if(m1 === (RailFenceCipherKey * 2) - 2){
                                decryptedTextArray.push(valueToDecrypt[i]);
                                i = i + m1; 
                            }
                            else{
                                if(t === 1){
                                    decryptedTextArray.push(valueToDecrypt[i]);
                                    i = i + m2; 
                                    t = 2;
                                }
                                else{
                                    decryptedTextArray.push(valueToDecrypt[i]);
                                    i = i + m1; 
                                    t = 1;
                                }
                            }
                        }

                        sp = sp + 1 ;
                        m1 = m1 - 2 ;
                        m2 = m2 + 2 ;
                        t  = 1 ;
                    }
                    encryptionCipherText.value = decryptedTextArray.join('');
                    //defend the east wall of the castle
                }
                else
                {
                    alert('enter something to decrypt!');
                }
            }
            else
            {
                alert('the key must be a number and 0 is not a valid key');
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
            if( parseInt(key.value) || parseInt(key.value) > 0 )
            {
                let RailFenceCipherKey = parseInt(key.value);
                let valueToEncrypt = decryptionCipherText.value.trim();
                if(valueToEncrypt)
                {
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

                    let decryptedTextArray = [];
                    for (let i = 0; i < valueToEncrypt.length; i++) {
                        decryptedTextArray.push('');
                    }

                    let m1 = ( RailFenceCipherKey * 2 ) - 2 ;
                    let m2 = 0 ;
                    let j  = 0 ;
                    let i  = 0 ;
                    let sp = 0 ;
                    let t = 1;

                    while (j < valueToEncrypt.length) 
                    {
                        while(i < valueToEncrypt.length)
                        {
                            if( m1 === ( RailFenceCipherKey * 2 ) - 2 )
                            {
                                decryptedTextArray[i] = (valueToEncrypt[j]);
                                i = i + m1;
                                j++;
                            }
                            else
                            {
                                if(t === 1)
                                {
                                    decryptedTextArray[i] = (valueToEncrypt[j]);
                                    i = i + m1;
                                    j++;
                                    t = 2;
                                }
                                else
                                {
                                    decryptedTextArray[i] = (valueToEncrypt[j]);
                                    i = i + m2;
                                    j++;
                                    t = 1;
                                }
                            }
                        }

                        sp = sp + 1;
                        i  = sp;
                        m1 = m1 - 2;
                        m2 = m2 + 2;
                        t  = 1;

                        if(m1 === 0){
                            m1 = ( RailFenceCipherKey * 2 ) - 2 ;
                        }
                    }
                    
                    decryptionPlainText.value = decryptedTextArray.join('');
                    //defend the east wall of the castle
                }
                else
                {
                    alert('enter something to decrypt!');
                }
            }
            else
            {
                alert('the key must be a number and 0 is not a valid key');
            }
        }
    }
}