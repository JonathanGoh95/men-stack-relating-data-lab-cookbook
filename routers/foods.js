const express = require("express");
const router = express.Router();
const foods = require("../controllers/foods");

router.post("/", foods.addFoodToPantry);
router.get("/", foods.getPantryItems);
router.delete("/:itemId", foods.deletePantryItem);
router.post("/:itemId", foods.updatePantryItem);

module.exports = router;
