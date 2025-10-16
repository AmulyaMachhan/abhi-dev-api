const Country = require("../models/country.model");
const District = require("../models/district.model");
const State = require("../models/state.model");

exports.createDistrict = async (req, res) => {
  const { name, state, country } = req.body;
  if (!name || !state || !country) {
    return res
      .status(400)
      .json({ error: "Name, state, and country are required" });
  }

  const countryDoc = await Country.findOne({ name: country }, { _id: 1 });
  if (!countryDoc)
    return res.status(409).json({ error: "Country does not exist" });

  const countryId = countryDoc._id;

  const stateDoc = await State.findOne({ name: state }, { _id: 1 });
  if (!stateDoc)
    return res.status(409).json({ error: "Country does not exist" });

  const stateId = stateDoc._id;

  const exists = await District.findOne({
    name: name.trim(),
    state: stateId,
    country: countryId,
  });
  if (exists) {
    return res
      .status(409)
      .json({ error: "District already exists in this state and country" });
  }

  const newDistrict = new District({
    name: name.trim(),
    state: stateId,
    country: countryId,
  });
  await newDistrict.save();
  res.status(201).json(newDistrict);
};

exports.listDistricts = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const query = search ? { name: { $regex: search, $options: "i" } } : {};

  const districts = await District.find(query)
    .populate("state", "name")
    .populate("country", "name")
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await District.countDocuments(query);

  res.json({
    total,
    page: parseInt(page),
    pageSize: districts.length,
    districts,
  });
};

exports.updateDistrict = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Id required" });
  }

  const { name, state, country } = req.body;

  const countryDoc = await Country.findOne({ name: country }, { _id: 1 });
  if (!countryDoc)
    return res.status(409).json({ error: "Country does not exist" });

  const countryId = countryDoc._id;

  const stateDoc = await State.findOne({ name: state }, { _id: 1 });
  if (!stateDoc)
    return res.status(409).json({ error: "Country does not exist" });

  const stateId = stateDoc._id;

  const duplicate = await District.findOne({
    name: name.trim(),
    state: stateId,
    country: countryId,
    _id: { $ne: id },
  });

  if (duplicate) {
    return res.status(409).json({
      error:
        "Another district with this name exists in the same state and country",
    });
  }

  const updated = await District.findByIdAndUpdate(
    id,
    { name, state: stateId, country: countryId },
    { new: true }
  );
  if (!updated) return res.status(404).json({ error: "District not found" });

  res.json(updated);
};

exports.deleteDistrict = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Id required" });
  }
  const deleted = await District.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "District not found" });

  res.json({ message: "District deleted" });
};
