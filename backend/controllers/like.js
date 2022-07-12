const Post = require("../models/Post");

exports.likePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (!post.likes.includes(req.body.userId)) {
        Post.updateOne(
          { _id: req.params.id },
          { $push: { likes: req.body.userId } }
          )
          .then(() => res.status(201).json({ message: "Publication likée !" }))
          .catch((error) => res.status(400).json({ error }));
      }else {
      Post.updateOne(
        { _id: req.params.id },
        { $pull: { likes: req.body.userId } }
        )
      .then(() => res.status(201).json({ message: "Publication dislikée !" }))
      .catch((error) => res.status(400).json({ error }));
    }
     
    })
    .catch((error) => res.status(500).json({ error }));
};
