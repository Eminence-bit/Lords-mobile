const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  trusted: { type: Boolean, default: false },
  inventory: [{ type: Schema.Types.ObjectId, ref: "Hero" }],
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("User", UserSchema);
