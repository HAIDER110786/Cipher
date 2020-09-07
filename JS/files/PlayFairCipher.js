import {authentication} from '../helperFiles/Authentication.js';
import {
    encryptionPlainText, 
    encryptionCipherText, 
    key,
    decryptionPlainText,
    decryptionCipherText,
} from '../helperFiles/ElementSelector.js';

export class PlayFairCipher{

    static encryption()
    {
        if(key.value.trim() === '' )
        {
            alert('enter a key for this cipher');
        }
        else
        {
            let PlayFairKey = key.value.trim().replace(/\s/g,'').toUpperCase();
            let validPlayFairKey = /^[a-z]+$/i. test(PlayFairKey);
            if(validPlayFairKey){
                key.value = PlayFairKey;
                let valueToDecrypt = encryptionPlainText.value.trim();
                if(valueToDecrypt){
                    let i=0;
                    valueToDecrypt = authentication.removeSpacesFromInBetween(valueToDecrypt);

                    //joel enjoys programming at friday nights yah

                    valueToDecrypt = valueToDecrypt.replace(/J/gi,"I");
                    
                    const localAuth = new authentication(valueToDecrypt);
                    
                    if(localAuth.anyAntiAlphabets()){
                        alert('Only alphabets are allowed in the plain text');
                        return;
                    }
                    
                    if(localAuth.anySmallAlphabets()){
                        // alert('Enter your plain text in CAPs here we have done that for you');
                        valueToDecrypt = valueToDecrypt.toUpperCase();
                    }

                    //The key value is PlayFairKey;
                    //The input value is valueToDecrypt;

                    PlayFairKey = PlayFairCipher.RemoveRepeatingWords(PlayFairKey);
                    const wordMatrix = PlayFairCipher.getWordMatrix(PlayFairKey);

                    valueToDecrypt = Array.from(valueToDecrypt);
                    i = 0;
                    while (i < valueToDecrypt.length) {
                        if(valueToDecrypt[i]==valueToDecrypt[i+1]){
                            //splice(index_where_to_add_array,elements_to_delete,elements_to_add)
                             valueToDecrypt.splice(i+1,0,'X');
                        }
                        i = i+2;
                    }
                    if(valueToDecrypt.length%2!==0){
                        valueToDecrypt.push('X');
                    }
                    
                    encryptionPlainText.value = valueToDecrypt.join('');

                    //The wordMatrix is the proper 2d matrix of the PlayFair key

                    let pairArray = [];
                    i = 0;
                    while(i < valueToDecrypt.length)
                    {
                        let j = 0;
                        while (j < 5) 
                        {
                            let k = 0;
                            while (k < 5) 
                            {
                                if(wordMatrix[j][k]===valueToDecrypt[i])
                                {
                                    if(pairArray.length>0)
                                    {      
                                        if(pairArray[pairArray.length-1].length==2)
                                        {
                                            pairArray[pairArray.length-1]+=j.toString()+k.toString();
                                        }
                                        else
                                        {
                                            pairArray.push(j.toString()+k.toString());
                                        }
                                    }
                                    else
                                    {
                                        pairArray.push(j.toString()+k.toString());
                                    }
                                    k=wordMatrix[j].length;
                                    j=wordMatrix.length;
                                }
                                k++;
                            }
                            j++;
                        }
                        i++;
                    }
                    
                    const encryptedArray=[];

                    for (let i = 0; i < pairArray.length; i++)
                    {
                        let col1 = parseInt( pairArray[i][0] ) ;
                        let row1 = parseInt( pairArray[i][1] ) ;
                        let col2 = parseInt( pairArray[i][2] ) ;
                        let row2 = parseInt( pairArray[i][3] ) ;

                        if(col1 == col2){
                            encryptedArray.push(wordMatrix[col1][(row1+1)%5]);
                            encryptedArray.push(wordMatrix[col2][(row2+1)%5]);
                        }
                        else if(row1 == row2){
                            encryptedArray.push(wordMatrix[(col1+1)%5][row1]);
                            encryptedArray.push(wordMatrix[(col2+1)%5][row2]);
                        }
                        else{
                            encryptedArray.push(wordMatrix[col1][row2]);
                            encryptedArray.push(wordMatrix[col2][row1]);
                        }
                    }
                    
                    encryptionCipherText.value = encryptedArray.join('');
                    // console.log(wordMatrix[col1][row1]);
                    // console.log(wordMatrix[col2][row2]);
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
            let PlayFairKey = key.value.trim().replace(/\s/g,'').toUpperCase();
            let validPlayFairKey = /^[a-z]+$/i. test(PlayFairKey);
            if(validPlayFairKey){
                key.value = PlayFairKey;
                let valueToEncrypt = decryptionCipherText.value.trim();
                if(valueToEncrypt){
                    let i=0;
                    valueToEncrypt = authentication.removeSpacesFromInBetween(valueToEncrypt);

                    //plain text : joel enjoys programming at friday nights yah
                    //key : question authority

                    // valueToDecrypt = valueToDecrypt.replace(/J/gi,"I");

                    if(valueToEncrypt.includes("J")){
                        alert('the alphabet J is not allowed in the cipher text');
                        return;
                    }
                    
                    const localAuth = new authentication(valueToEncrypt);
                    
                    if(localAuth.anyAntiAlphabets()){
                        alert('Only alphabets are allowed in the cipher text');
                        return;
                    }
                    
                    if(localAuth.anySmallAlphabets()){
                        // alert('Enter your plain text in CAPs here we have done that for you');
                        valueToEncrypt = valueToEncrypt.toUpperCase();
                    }

                    //The key value is PlayFairKey;
                    //The input value is valueToDecrypt;

                    PlayFairKey = PlayFairCipher.RemoveRepeatingWords(PlayFairKey);
                    const wordMatrix = PlayFairCipher.getWordMatrix(PlayFairKey);

                    valueToEncrypt = Array.from(valueToEncrypt);
                    i = 0;
                    while (i < valueToEncrypt.length) {
                        if(valueToEncrypt[i]==valueToEncrypt[i+1]){
                            //splice(index_where_to_add_array,elements_to_delete,elements_to_add)
                            alert('pairing of 2 same alphabets in cipher text is not allowed');
                            return;
                        }
                        i = i+2;
                    }
                    if(valueToEncrypt.length%2!==0){
                        alert('the cipher text must be of even length');
                        return;
                    }
                    
                    decryptionCipherText.value = valueToEncrypt.join('').toUpperCase();

                    //The wordMatrix is the proper 2d matrix of the PlayFair key

                    let pairArray = [];
                    i = 0;
                    while(i < valueToEncrypt.length)
                    {
                        let j = 0;
                        while (j < 5) 
                        {
                            let k = 0;
                            while (k < 5) 
                            {
                                if(wordMatrix[j][k]===valueToEncrypt[i])
                                {
                                    if(pairArray.length>0)
                                    {      
                                        if(pairArray[pairArray.length-1].length==2)
                                        {
                                            pairArray[pairArray.length-1]+=j.toString()+k.toString();
                                        }
                                        else
                                        {
                                            pairArray.push(j.toString()+k.toString());
                                        }
                                    }
                                    else
                                    {
                                        pairArray.push(j.toString()+k.toString());
                                    }
                                    k=wordMatrix[j].length;
                                    j=wordMatrix.length;
                                }
                                k++;
                            }
                            j++;
                        }
                        i++;
                    }
                    
                    const decryptedArray=[];

                    for (let i = 0; i < pairArray.length; i++)
                    {
                        let col1 = parseInt( pairArray[i][0] ) ;
                        let row1 = parseInt( pairArray[i][1] ) ;
                        let col2 = parseInt( pairArray[i][2] ) ;
                        let row2 = parseInt( pairArray[i][3] ) ;

                        if(col1 == col2){
                            decryptedArray.push(wordMatrix[col1][(row1-1+5)%5]);
                            decryptedArray.push(wordMatrix[col2][(row2-1+5)%5]);
                        }
                        else if(row1 == row2){
                            decryptedArray.push(wordMatrix[(col1-1+5)%5][row1]);
                            decryptedArray.push(wordMatrix[(col2-1+5)%5][row2]);
                        }
                        else{
                            decryptedArray.push(wordMatrix[col1][row2]);
                            decryptedArray.push(wordMatrix[col2][row1]);
                        }
                    }
                    
                    decryptionPlainText.value = decryptedArray.join('');
                    // console.log(wordMatrix[col1][row1]);
                    // console.log(wordMatrix[col2][row2]);
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

    static RemoveRepeatingWords(key){ 
        const uniqueKeys = [];
        uniqueKeys.push(key[0]);
        for (let i = 1; i < key.length; i++){
            if(!uniqueKeys.includes(key[i]) ){
                uniqueKeys.push(key[i]);
            }
        }
        return uniqueKeys;
    }

    static getWordMatrix(key){
        const wordMatrix = [];
        wordMatrix.push(...key);
        for (let i = 65; i <= 90 ; i++) {
            const currentWord = String.fromCharCode(i);
            if(!wordMatrix.includes(currentWord) && currentWord!=='J'){
                wordMatrix.push(currentWord);
            }
        }
        const word2Dmatrix = [];
        let i=0;
        for (let j = 0; j < wordMatrix.length; j++) {
            if(j===0){
                word2Dmatrix.push([]);
            }
            if( j !== 0 && j % 5 === 0 ){
                word2Dmatrix.push([]);
                i++;
            }
            word2Dmatrix[i].push(wordMatrix[j])
        }
        return word2Dmatrix;
    }
}