const express = require("express");
const router = require("../routes/routes.js");
const serverless = require("serverless-http");
const path = require("path");

const app = express();
// const port = 8000;

app.set("views", path.join(__dirname, "../views"));
app.use(express.static("public"));
app.use("/", router);

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

module.exports = serverless(app);
