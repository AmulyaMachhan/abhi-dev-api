const fs = require("fs");
const path = require("path");
const UserProfile = require("../models/userProfile.model");

exports.createProfile = async (req, res) => {
  const { name, phoneNumber, email } = req.body;
  if (!name || !phoneNumber || !email) {
    return res
      .status(400)
      .json({ error: "Name, phone number, and email are required" });
  }

  const exists = await UserProfile.findOne({
    $or: [{ email }, { phoneNumber }],
  });

  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  if (!imagePath) {
    return res.status(404).json({ error: "Image not found" });
  }
  if (exists) {
    return res
      .status(409)
      .json({ error: "User with this email or phone number already exists" });
  }

  const newProfile = new UserProfile({ name, phoneNumber, email, imagePath });
  await newProfile.save();
  res.status(201).json(newProfile);
};

exports.listProfiles = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  const query = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phoneNumber: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const profiles = await UserProfile.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await UserProfile.countDocuments(query);

  res.json({
    total,
    page: parseInt(page),
    pageSize: profiles.length,
    profiles,
  });
};

exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Id required" });

    const { name, phoneNumber, email } = req.body;

    const user = await UserProfile.findById(id);
    if (!user) return res.status(404).json({ error: "Profile not found" });

    if (email && email !== user.email) {
      const duplicate = await UserProfile.findOne({ email });
      if (duplicate) {
        return res
          .status(409)
          .json({ error: "Another user with this email exists" });
      }
      user.email = email;
    }

    if (name) user.name = name;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    if (req.file) {
      if (user.imagePath) {
        const oldPath = path.join(__dirname, "..", "public", user.imagePath);
        fs.unlink(oldPath, (err) => {
          if (err) console.log("Old image deletion error:", err);
        });
      }
      user.imagePath = `/uploads/${req.file.filename}`;
    }

    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteProfile = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Id required" });
  }

  const user = await UserProfile.findById(id);
  if (!user) {
    return res.status(404).json({ error: "Profile already deleted" });
  }

  //Deleted Image from server to reduce load
  fs.unlink(path.join(__dirname, "..", "public", user.imagePath), (err) => {
    if (err) console.log("Old image deletion error:", err);
  });

  const deleted = await UserProfile.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "Profile not found" });

  res.json({ message: "Profile deleted" });
};
