import express from "express";
import articleRouter from "./routes/article-routes.js";
import peopleRoutes from "./routes/people-routes.js";
const app = express();
const port = 8000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/", articleRouter);

app.get("/people", peopleRoutes);

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
