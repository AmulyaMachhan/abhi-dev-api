const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    imagePath: { type: String },
  },
  {
    timestamps: true,
  }
);

const UserProfile = mongoose.model("UserProfile", schema);
module.exports = UserProfile;
