import express from "express";
import router from "../routes/routes.js";
import serverless from "serverless-http";

const app = express();
// const port = 8000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/", router);

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

export const handler = serverless(api);
