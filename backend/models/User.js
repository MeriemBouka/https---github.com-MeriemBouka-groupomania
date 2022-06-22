const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  userImg: { type: String },
  isAdmin: { type: Boolean, default: false}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
