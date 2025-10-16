const express = require("express");
const router = express.Router();
const state = require("../controllers/state.controller.js");

router.post("/", state.createState);
router.get("/", state.listStates);
router.put("/:id", state.updateState);
router.delete("/:id", state.deleteState);

module.exports = router;
