import express from "express";
import router from "../routes/routes.js";
import serverless from "serverless-http";
import path from "path";

const app = express();
// const port = 8000;

app.set("views", path.join(import.meta.url, "../views"));
app.use(express.static("public"));
app.use("/", router);

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

export const handler = serverless(app);
