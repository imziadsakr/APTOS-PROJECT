import validator from "validator";

export const validatorEmail = (email) => {
    if(!email) return false;

    if(!validator.isEmail(email)) return false ;

    return true ;
}

export const validatorPassword = (pass) => {
    if(!pass) return false ;
    if(pass.length < 8) return false;

    return true ;
}