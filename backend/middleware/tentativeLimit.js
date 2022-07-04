const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  max: 10,
  windowMs: 1 * 60 * 1000,
  message: "Trop de tentatives de connexion. Réessayer dans 1 minute",
  standardHeaders: true,
  legacyHeaders: false, 
});

module.exports = { limiter };