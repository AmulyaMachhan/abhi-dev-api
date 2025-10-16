const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: { type: String, required: true },
    country: { type: Schema.Types.ObjectId, ref: "Country", required: true },
  },
  {
    timestamps: true,
  }
);

const State = mongoose.model("State", schema);
module.exports = State;
