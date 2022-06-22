const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer-config");
const like = require("../controllers/like");

router.post("/",auth,multer, postCtrl.createPost);
router.put("/:id",auth, multer, postCtrl.updatePost);
router.delete("/:id",auth, multer, postCtrl.deletePost);
router.get("/:id",auth, postCtrl.getOnePost);
router.get("/",auth, postCtrl.getAllPosts);
router.post("/:id/like",auth, like.likePost);


module.exports = router;
