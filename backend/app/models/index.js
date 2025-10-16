const dbConfig = require("../config/db.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.language = require("./language.model.js")(mongoose);
db.country = require("./country.model.js")(mongoose);
db.state = require("./state.model.js")(mongoose);
db.district = require("./district.model.js")(mongoose);
db.userProfile = require("./userProfile.model.js")(mongoose);
db.students = require("./students.model.js")(mongoose);

module.exports = db;
