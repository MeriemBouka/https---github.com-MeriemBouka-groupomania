const jwt = require('jsonwebtoken');

// Validation userId et isAdmin en comparaison avec le token
module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const isAdmin = decodedToken.isAdmin;
         const userId = decodedToken.userId;
        req.auth = { isAdmin,userId };

          if(req.body.userId && req.body.userId !== userId){
            return res.status(401).json({error: "User role non valable !"})
          }else{
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};