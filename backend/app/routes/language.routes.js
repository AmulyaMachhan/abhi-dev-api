const express = require("express");
const router = express.Router();
const language = require("../controllers/language.controller");

router.post("/", language.createLanguage);
router.get("/", language.listLanguages);
router.put("/:id", language.updateLanguage);
router.delete("/:id", language.deleteLanguage);

module.exports = router;
