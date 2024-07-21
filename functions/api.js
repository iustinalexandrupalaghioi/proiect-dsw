import express from "express";
import router from "../routes/routes.js";
import serverless from "serverless-http";
import path from "path";

const app = express();
// const port = 8000;

const moduleUrl = new URL(import.meta.url);
if (moduleUrl.protocol === "file:") {
  // Check for file protocol
  moduleUrl.pathname = moduleUrl.pathname.replace(/^\//, ""); // Remove initial slash
}

const currentDirectory = path.dirname(moduleUrl.pathname);
const viewsDirectory = path.join(currentDirectory, "../views");
app.set("views", viewsDirectory);
app.use(express.static("public"));
app.use("/", router);

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

export const handler = serverless(app);
