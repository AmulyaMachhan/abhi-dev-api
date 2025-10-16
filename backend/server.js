const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { url } = require("./app/config/db");
const router = require("./app/routes/index");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/", router);

mongoose
  .connect(url, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
