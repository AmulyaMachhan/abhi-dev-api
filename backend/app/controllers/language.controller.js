const Language = require("../models/language.model");

exports.createLanguage = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      message: "Name is required",
    });
  }
  const exists = await Language.findOne({ name: name.trim() });
  if (exists) {
    return res.status(400).json({
      message: "Language already exists",
    });
  }

  const newLang = new Language({ name: name.trim() });
  await newLang.save();
  res.status(201).json({
    message: "Language created successfully",
    data: newLang,
  });
};

exports.listLanguages = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const query = search ? { name: { $regex: search, $options: "i" } } : {};

  const languages = await Language.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await Language.countDocuments(query);

  res.json({
    total,
    data: languages,
  });
};

exports.updateLanguage = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Id required" });
  }
  const { name } = req.body;

  const updated = await Language.findByIdAndUpdate(id, { name }, { new: true });
  if (!updated) return res.status(404).json({ error: "Language not found" });

  res.json(updated);
};

exports.deleteLanguage = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Id required" });
  }
  const deleted = await Language.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "Language not found" });

  res.json({ message: "Language deleted" });
};
