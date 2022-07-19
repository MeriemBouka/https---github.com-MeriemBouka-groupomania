const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function isEmail(email){
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if(email !== '' && regex.test(email)){
        return true;
    }
}
function isLogin(login){
      const regexLogin = /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,20}$/

    if(login !== '' && regexLogin.test(login)){
        return true;
    }
}

exports.signup = (req, res, next) => {
  if(!isEmail(req.body.email) || !isLogin(req.body.login)){
  return res.status(400).json({ error: "code ne respecte pas le modèle !" });
}
else{
  User.findOne({ login: req.body.login })
  .then((user) => {
      if (user) {
        return res.status(401).json({ error: "Nom d'utilisateur existant" });
      }
      else{
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        login: req.body.login,
        isAdmin : req.body.isAdmin
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
  }
})
}
}
exports.login = (req, res, next) => {
 
  User.findOne({ email: req.body.email })
  .then((user) => {
      if(!isEmail(req.body.email)){
      return res.status(400).json({ error: "code ne respecte pas le modèle ." });
     }
     else{
      if (!user) {
        return res.status(400).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            login: user.login,
            isAdmin: user.isAdmin,
            token: jwt.sign({ userId: user._id,login: user.login, isAdmin: user.isAdmin }, process.env.token, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
       } 
    })
    .catch((error) => res.status(500).json({ error }));
};
