import "dotenv/config";
import axios from "axios";

const getArticles = async (req, res) => {
  const headers = {
    "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    "X-RapidAPI-Host": process.env.RAPID_API_HOST,
  };

  try {
    const articlesResponse = await axios.get(process.env.SPACE_NEWS_API_URL_2, {
      headers,
    });
    const articles = articlesResponse.data;

    const todayArticlesResponse = await axios.get(
      process.env.SPACE_NEWS_API_URL,
      {
        headers,
      }
    );
    const todayArticles = todayArticlesResponse.data;

    res.render("index.ejs", { articles, todayArticles });
  } catch (error) {
    res.render("index.ejs", {
      error,
      message: "Oops! Something went wrong. Please try again later.",
    });
    console.error(error.message);
  }
};

export default getArticles;
