const express = require("express");
const router = express.Router();
const {
  createCountry,
  listCountry,
  updateCountry,
  deleteCountry,
} = require("../controllers/country.controller.js");

router.post("/", createCountry);
router.get("/", listCountry);
router.put("/:id", updateCountry);
router.delete("/:id", deleteCountry);

module.exports = router;
