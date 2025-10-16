const express = require("express");
const router = express.Router();

router.use("/language", require("./language.routes.js"));
router.use("/country", require("./country.routes.js"));
router.use("/state", require("./state.routes.js"));
router.use("/district", require("./district.routes.js"));
router.use("/userProfile", require("./userProfile.routes.js"));
router.use("/student", require("./students.routes.js"));

module.exports = router;
