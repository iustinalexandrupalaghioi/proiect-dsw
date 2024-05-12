import axios from "axios";
import "dotenv/config";

const getArticles = async (req, res) => {
  try {
    const response = await axios.get(process.env.SPACE_NEWS_API_URL_2, {
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.RAPID_API_HOST,
      },
    });
    const result = response.data;
    res.render("index.ejs", { articles: result });
  } catch (error) {
    console.error(error);
  }
};

export default getArticles;
