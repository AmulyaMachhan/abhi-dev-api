const Student = require("../models/students.model");

exports.createUser = async (req, res) => {
  const { firstname, email, mobile, gender, countryId, stateId, districtId } =
    req.body;
  if (
    !firstname ||
    !email ||
    !mobile ||
    !gender ||
    !countryId ||
    !stateId ||
    !districtId
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const exists = await Student.findOne({ $or: [{ email }, { mobile }] });
  if (exists) {
    return res
      .status(409)
      .json({ error: "User with this email or mobile already exists" });
  }

  const newUser = new Student({
    firstname,
    email,
    mobile,
    gender,
    countryId,
    stateId,
    districtId,
  });
  await newUser.save();
  res.status(201).json(newUser);
};

exports.listUsers = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  const query = search
    ? {
        $or: [
          { firstname: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { mobile: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const users = await Student.find(query)
    .populate("countryId", "name")
    .populate("stateId", "name")
    .populate("districtId", "name")
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await Student.countDocuments(query);

  res.json({
    total,
    page: parseInt(page),
    pageSize: users.length,
    users,
  });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstname, email, mobile, gender, countryId, stateId, districtId } =
    req.body;

  const duplicate = await Student.findOne({
    email,
    _id: { $ne: id },
  });

  if (duplicate) {
    return res
      .status(400)
      .json({ error: "Another user with this email already exists" });
  }

  const updated = await Student.findByIdAndUpdate(
    id,
    { firstname, email, mobile, gender, countryId, stateId, districtId },
    { new: true }
  );

  if (!updated) return res.status(404).json({ error: "User not found" });

  res.json(updated);
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const deleted = await Student.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "User not found" });

  res.json({ message: "User deleted" });
};
