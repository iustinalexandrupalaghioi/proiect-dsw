const express = require("express");
const getArticles = require("../controllers/articles-controller.js");
const getPeople = require("../controllers/people-controller.js");

const router = express.Router();

//endpoint to get space news - homepage

router.get("/", getArticles);

//endpoint to get people that are in Space
router.get("/people", getPeople);

export default router;
