import express from "express";
import router from "../routes/routes.js";
import serverless from "serverless-http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// const port = 8000;

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/api", router);

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

export const handler = serverless(api);
