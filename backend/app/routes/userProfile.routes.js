const express = require("express");
const router = express.Router();
const userProfile = require("../controllers/userProfile.controller.js");
const uploadImage = require("../middlewares/upload.middleware.js");

router.post("/", uploadImage.single("image"), userProfile.createProfile);
router.get("/", userProfile.listProfiles);
router.put("/:id", uploadImage.single("image"), userProfile.updateProfile);
router.delete("/:id", userProfile.deleteProfile);

module.exports = router;
