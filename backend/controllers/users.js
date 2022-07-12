const User = require("../models/User");



exports.getOneUser=(req, res, next)=>{
  User.findById(req.params.id)
  .then((user) => res.status(200).json(user))
  .catch((error) => res.status(404).json({ error }));
}
