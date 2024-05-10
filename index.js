import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";

const app = express();
const port = 8000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(process.env.SPACE_NEWS_API_URL, {
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
});

app.get("/people", async (req, res) => {
  try {
    const response = await axios.get(process.env.OPEN_NOTIFY_API_URL);
    const data = response.data.people;
    const number = response.data.number;

    // const data = [
    //   { name: "Jasmin Moghbeli", craft: "ESA" },
    //   { name: "Andreas Mogensen", craft: "ESA" },
    //   { name: "Satoshi Furukawa", craft: "ISS" },
    //   { name: "Konstantin Borisov", craft: "ISS" },
    //   { name: "Oleg Kononenko", craft: "NASA" },
    //   { name: "Nikolai Chub", craft: "ISS" },
    //   { name: "Loral O'Hara", craft: "ISS" },
    //   { name: "Mary Sue Van Pelt", craft: "NASA" },
    // ];
    // const number = data.length;

    const crafts = [...new Set(data.map((person) => person.craft))];

    let peopleGroupedByCraft = [];
    crafts.forEach((craft, index) => {
      peopleGroupedByCraft[index] = data.filter(
        (person) => person.craft === craft
      );
    });

    let sortedPeople = [];
    peopleGroupedByCraft.forEach((group) => {
      group.sort((a, b) => {
        let first = a.name.toLowerCase();
        let second = b.name.toLowerCase();
        if (first < second) {
          return -1;
        }
        if (first > second) {
          return 1;
        }
        return 0;
      });
      sortedPeople.push(group);
    });
    res.render("people.ejs", { sortedPeople, number });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
