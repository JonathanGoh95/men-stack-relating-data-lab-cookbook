const User = require("../models/Users");

async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getUserPantry(req, res) {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ pantry: user.pantry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getAllUsers, getUserPantry };
