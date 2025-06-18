const express = require("express");
const router = express.Router();
const users = require("../controllers/users");

router.get("/all", users.getAllUsers);
router.get("/:userId", users.getUserPantry);

module.exports = router;
