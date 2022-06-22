const Post = require("../models/Post");

exports.likePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (!post.usersLiked.includes(req.body.userId) && req.body.like === 1) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $inc: {
              likes: 1,
            },
            $push: { usersLiked: req.body.userId },
          }
        )
          .then(() => res.status(201).json({ message: "Publication likée !" }))
          .catch((error) => res.status(400).json({ error }));
      }
      if (post.usersLiked.includes(req.body.userId) && req.body.like === 0) {
        Post.updateOne(
          {
            _id: req.params.id,
          },
          {
            $inc: {
              likes: -1,
            },
            $pull: { usersLiked: req.body.userId },
          }
        )
          .then(() => res.status(201).json({ message: "Supression du like !" }))
          .catch((error) => res.status(400).json({ error }));
      }
      if (
        !post.usersDisliked.includes(req.body.userId) &&
        req.body.like === -1
      ) {
        Post.updateOne(
          {
            _id: req.params.id,
          },
          {
            $inc: {
              dislikes: 1,
            },
            $push: { usersDisliked: req.body.userId },
          }
        )
          .then(() =>
            res.status(201).json({ message: "Publication dislikée !" })
          )
          .catch((error) => res.status(400).json({ error }));
      }
      if (post.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
        Post.updateOne(
          {
            _id: req.params.id,
          },
          {
            $inc: {
              dislikes: -1,
            },
            $pull: { usersDisliked: req.body.userId },
          }
        )
          .then(() =>
            res.status(201).json({ message: "Supression du dislike !" })
          )
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(404).json({ error }));
};
