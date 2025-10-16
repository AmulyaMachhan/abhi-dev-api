const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: { type: String, required: true },
    state: { type: Schema.Types.ObjectId, ref: "State", required: true },
    country: { type: Schema.Types.ObjectId, ref: "Country", required: true },
  },
  {
    timestamps: true,
  }
);

const District = mongoose.model("District", schema);
module.exports = District;
