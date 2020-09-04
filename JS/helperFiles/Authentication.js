export class authentication{

    constructor(value){
        this.value=value;
    }

    anySmallAlphabets(){
        return /[a-z]/g. test(this.value) ;
    }
    
    anyAntiAlphabets(){
        // return !/^[A-Za-z]+$/. test(this.value);
        // return !/^[a-z]+$/i. test(this.value);
        return !/^[a-z]+$/i. test(this.value);
    }

    static removeSpacesFromInBetween(value){
        return value.replace(/\s/g,'') ;
    }
}
