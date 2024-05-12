import { Router } from "express";
import getArticles from "../controllers/articles-controller.js";

const articleRoutes = Router();

articleRoutes.get("/", getArticles);

export default articleRoutes;
