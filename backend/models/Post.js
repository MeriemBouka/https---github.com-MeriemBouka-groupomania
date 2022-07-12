const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  // likes, dislikes, usersLiked, usersDisliked
  userId: { type: String, required: true },
  imgUrl: { type: String, required:true },
  text: { type: String, required:true },
  creationDate: { type: Date, default: Date.now },
  likes: {type: Array,default: [],
  },
},
);

module.exports = mongoose.model("Post", postSchema);
