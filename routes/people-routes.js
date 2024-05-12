import { Router } from "express";
import getPeople from "../controllers/people-controller.js";

const peopleRoutes = Router();

peopleRoutes.get("/people", getPeople);

export default peopleRoutes;
