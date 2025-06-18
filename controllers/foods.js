const User = require("../models/Users");

async function addFoodToPantry(req, res) {
  try {
    // Look up the current user from the JWT
    const user = await User.findById(req.decoded.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Push req.body to the pantry array
    user.pantry.push(req.body);

    // Save changes to the user
    await user.save();

    res.status(201).json({ pantry: user.pantry });
  } catch (err) {
    // Inform user of the error
    res.status(500).json({ error: err.message });
  }
}

async function getPantryItems(req, res) {
  try {
    // Look up the current user from the JWT
    const user = await User.findById(req.decoded.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Get all items from the pantry
    res.status(200).json({ pantry: user.pantry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deletePantryItem(req, res) {
  try {
    // Look up the current user from the JWT
    const user = await User.findById(req.decoded.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    // Remove the food item from the pantry array by _id
    const result = user.pantry.id(req.params.itemId)?.remove();

    if (!result) {
      return res.status(404).json({ error: "Food item not found in pantry" });
    }

    // Save changes to the user
    await user.save();

    res.json({ message: "Food item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updatePantryItem(req, res) {
  try {
    // Look up the current user from the JWT
    const user = await User.findById(req.decoded.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const food = user.pantry.id(req.params.itemId)?.remove();
    if (!food) return res.status(404).json({ error: "Food Item not found" });

    food.set(req.body);

    // Save changes to the user
    await user.save();

    res.json({ message: "Food item updated successfully", food });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  addFoodToPantry,
  getPantryItems,
  deletePantryItem,
  updatePantryItem,
};
