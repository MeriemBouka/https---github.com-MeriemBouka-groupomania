const Post = require("../models/Post");
const fs = require("fs");

exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  console.log(req.body.post);
  delete postObject._id;
  delete postObject._userId
  const post = new Post({
    ...postObject,
    // userId: req.auth.userId,
    imgUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  });
  post
    .save()
    .then(() => res.status(201).json({ message: "Publication enregistrée !" }))
    .catch((error) => res.status(400).json( {error,  message: 'Vous ne pouvez pas publier un post'} ));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

exports.updatePost = (req, res, next) => {
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imgUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

    delete postObject._userId;
    Post.findOne({_id : req.params.id})
    .then((post) =>{
      if(req.auth.isAdmin === false){
        if(post.userId != req.auth.userId){
          res.satutus(401).json({message : "Non autorisé"});
        }
        else{
        Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: "Post modifié !" }))
      .catch(error => res.status(401).json({ error }));
        }
      }
      else{
        Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: "Post modifié !" }))
      .catch(error => res.status(401).json({ error }));
        }
    })
    .catch((error) => {
      res.status(400).json({error});
    })
  
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
       if (!post) {
        res.status(404).json({
          error: new Error('Publication non disponible!')
        });
      }
     if (req.auth.isAdmin === false){
      if (post.userId !== req.auth.userId) {
        res.status(400).json({
          error: new Error('Requête non autorisée!')
        });
      }
      else{const filename = post.imgUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Post supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
}
    }
    else{const filename = post.imgUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Post supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
}
     
     } )
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};


