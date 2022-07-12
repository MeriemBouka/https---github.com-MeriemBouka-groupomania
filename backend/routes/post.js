const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer-config");
const like = require("../controllers/like");

router.post("/",multer, postCtrl.createPost);
router.put("/:id",adminAuth, postCtrl.updatePost);
router.delete("/:id",auth, adminAuth, multer, postCtrl.deletePost);
router.get("/:id",auth, postCtrl.getOnePost);
router.get("/",auth, postCtrl.getAllPosts);
router.put("/:id/like",auth, like.likePost);


module.exports = router;
