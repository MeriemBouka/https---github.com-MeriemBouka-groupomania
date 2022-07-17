const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  max: 5,
  windowMs: 1 * 60 * 1000,
  message: "Trop de tentatives de connexion. Réessayer dans 1 minute.",
  legacyHeaders: false, 
});

module.exports = { limiter };