const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const tentatives = require("../middleware/tentativeLimit");
const password = require("../middleware/password");
const multer = require("../middleware/multer-config");

router.post("/signup",password, userCtrl.signup);
router.post("/login",password,tentatives.limiter ,userCtrl.login);

module.exports = router;
