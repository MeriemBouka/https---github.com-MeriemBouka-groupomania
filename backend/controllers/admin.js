const User = require("../models/User");
const Post = require("../models/Post");
const fs = require("fs");


exports.deletePostAdmin = (req, res, next) => {
  Post.findOne({ _id: req.params.id })

    .then((post) => {
      const filename = post.imgUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Publication supprimée !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};