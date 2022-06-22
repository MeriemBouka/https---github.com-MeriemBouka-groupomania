const mongoose = require("mongoose");

var Comment = mongoose.Schema({
  text: { type: String },
  userId: { type: String },
  creationDate: { type: Date, default: Date.now },
});

const postSchema = mongoose.Schema({
  // likes, dislikes, usersLiked, usersDisliked
  userId: { type: String, required: true },
  imgUrl: { type: String, required:true },
  titre: { type: String, required: true },
  text: { type: String },
  creationDate: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
  comments: [Comment],
});

module.exports = mongoose.model("Post", postSchema);
