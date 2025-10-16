"use strict";
const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const { PORT, DB_URL, DB_NAME } = process.env;

assert(PORT, "PORT is required");
module.exports = {
  url: `${DB_URL}`,
};
