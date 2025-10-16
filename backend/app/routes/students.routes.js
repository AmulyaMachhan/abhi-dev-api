const express = require("express");
const router = express.Router();
const controller = require("../controllers/students.controller.js");

router.post("/", controller.createUser);
router.get("/", controller.listUsers);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;
