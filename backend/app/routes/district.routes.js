const express = require("express");
const router = express.Router();
const district = require("../controllers/district.controller.js");

router.post("/", district.createDistrict);
router.get("/", district.listDistricts);
router.put("/:id", district.updateDistrict);
router.delete("/:id", district.deleteDistrict);

module.exports = router;
