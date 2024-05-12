import { Router } from "express";
import getArticles from "../controllers/articles-controller.js";
import getPeople from "../controllers/people-controller.js";

const router = Router();

//endpoint to get space news - homepage
router.get("/", getArticles);

//endpoint to get people that are in Space
router.get("/people", getPeople);

export default router;
