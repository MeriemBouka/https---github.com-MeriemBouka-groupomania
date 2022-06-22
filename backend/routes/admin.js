const express = require("express");
const router = express.Router();

const adminAuth = require("../middleware/adminAuth");
const adminCtrl = require("../controllers/admin");
const multer = require("../middleware/multer-config");


router.delete("/:id", adminAuth, multer, adminCtrl.deletePostAdmin);
router.put("/:id", adminAuth, multer, adminCtrl.updatePostAdmin);

module.exports = router;