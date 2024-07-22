import express from "express";
import "dotenv/config";
import router from "./routes/routes.js";
const app = express();
const port = 8000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/", router);

app.listen(process.env.PORT || port);
