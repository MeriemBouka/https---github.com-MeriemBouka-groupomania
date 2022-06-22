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

exports.updatePostAdmin = (req, res, next) => {
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imgUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Post modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};