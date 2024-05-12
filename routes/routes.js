import { Router } from "express";
import getArticles from "../controllers/articles-controller.js";
import getPeople from "../controllers/people-controller.js";

const router = Router();

router.get("/", getArticles);
router.get("/people", getPeople);

export default router;
