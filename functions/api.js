import express from "express";
import router from "../routes/routes.js";
import serverless from "serverless-http";
import path from "path";

const app = express();
// const port = 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static("public"));
app.use("/api", router);

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

export const handler = serverless(api);
