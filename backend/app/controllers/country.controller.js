const Country = require("../models/country.model");

exports.createCountry = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const exists = await Country.findOne({ name: name.trim() });
    if (exists) {
      return res.status(400).json({ message: "Country already exists" });
    }

    const newCon = new Country({ name: name.trim() });
    await newCon.save();

    res.status(201).json({
      message: "Country created successfully",
      data: newCon,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.listCountry = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    const countries = await Country.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Country.countDocuments(query);

    res.json({
      total,
      data: countries,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) return res.status(400).json({ error: "Id required" });

    const updated = await Country.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Country not found" });

    res.json({ message: "Country updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Id required" });

    const deleted = await Country.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Country not found" });

    res.json({ message: "Country deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
