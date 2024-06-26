import axios from "axios";
import "dotenv/config";
import slugify from "slugify";

const getPeople = async (req, res) => {
  try {
    const response = await axios.get(process.env.OPEN_NOTIFY_API_URL);
    const { people, number } = response.data;

    // const people = [
    //   { name: "Jasmin Moghbeli", craft: "ESA" },
    //   { name: "Andreas Mogensen", craft: "ESA" },
    //   { name: "Satoshi Furukawa", craft: "ISS" },
    //   { name: "Konstantin Borisov", craft: "ISS" },
    //   { name: "Oleg Kononenko", craft: "NASA" },
    //   { name: "Nikolai Chub", craft: "ISS" },
    //   { name: "Loral O'Hara", craft: "ISS" },
    //   { name: "Mary Sue Van Pelt", craft: "NASA" },
    // ];
    // const number = people.length;

    //add name slugs to each person
    const updatedPeople = people.map((person) => ({
      ...person,
      nameSlug: slugify(person.name, "_"),
    }));

    // extract unique crafts from updatedPeople array
    const crafts = [...new Set(updatedPeople.map((person) => person.craft))];

    //group people by their crafts
    let peopleGroupedByCraft = [];
    crafts.forEach((craft, index) => {
      peopleGroupedByCraft[index] = updatedPeople.filter(
        (person) => person.craft === craft
      );
    });

    //sort grouped people by name
    let sortedPeople = peopleGroupedByCraft.map((group) => {
      return group.sort((a, b) => {
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
      // sortedPeople.push(group);
    });

    res.render("people.ejs", { sortedPeople, number });
  } catch (error) {
    res.render("people.ejs", {
      error,
      message: "Oops! Something went wrong. Please try again later!",
    });
    console.error(error.message);
  }
};

export default getPeople;
