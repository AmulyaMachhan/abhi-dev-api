const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    firstname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    countryId: { type: Schema.Types.ObjectId, ref: "Country", required: true },
    stateId: { type: Schema.Types.ObjectId, ref: "State", required: true },
    districtId: {
      type: Schema.Types.ObjectId,
      ref: "District",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Students", schema);
module.exports = Student;
