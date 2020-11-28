var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var warnSchema = new mongoose.Schema({
  id: String,
  displayName: String,
  inviter: String,
  invites: { type: Number, default: 0 },
  members: { type: Array, default: [] },
});

module.exports = mongoose.model("invites", warnSchema);
