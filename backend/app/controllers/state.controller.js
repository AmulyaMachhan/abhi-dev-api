const State = require("../models/state.model");

exports.createState = async (req, res) => {
  try {
    const { name, country } = req.body;
    if (!name || !country)
      return res.status(400).json({ error: "Name and country are required" });

    const exists = await State.findOne({
      name: name.trim(),
      country,
    });

    if (exists)
      return res
        .status(409)
        .json({ error: "State already exists in this country" });

    const newState = new State({ name: name.trim(), country });
    await newState.populate("country");
    await newState.save();

    res.status(201).json(newState);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listStates = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const query = search ? { name: { $regex: search, $options: "i" } } : {};

  const states = await State.find(query)
    .populate("country", "name")
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await State.countDocuments(query);

  res.json({
    total,
    page: parseInt(page),
    data: states,
  });
};

exports.updateState = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Id required" });

  const { name, country } = req.body;

  const duplicate = await State.findOne({
    name: name.trim(),
    country,
    _id: { $ne: id },
  });
  if (duplicate)
    return res.status(409).json({
      error: "Another state with this name exists in the same country",
    });

  const updated = await State.findByIdAndUpdate(
    id,
    { name: name.trim(), country },
    { new: true }
  ).populate("country");

  if (!updated) return res.status(404).json({ error: "State not found" });

  res.json(updated);
};

exports.deleteState = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Id required" });
  }
  const deleted = await State.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "State not found" });

  res.json({ message: "State deleted" });
};
