const passwordValid = require("password-validator");

const passwordSchema = new passwordValid();

passwordSchema
.is().min(8)                                    
.is().max(100)                                  
.has().uppercase()                             
.has().lowercase()                              
.has().digits(1)                               
.has().not().spaces()                           
.is().not().oneOf(['Passw0rd', 'Password123']); 

module.exports = (req, res, next) =>{
    if(passwordSchema.validate(req.body.password)){
        next();
    }
    else{
        res.status(400).json({"message" : `Mot de passe non sécurisé !`})
    }
}