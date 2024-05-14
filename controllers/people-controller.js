import axios from "axios";
import "dotenv/config";
import slugify from "slugify";

const getPeople = async (req, res) => {
  try {
    const response = await axios.get(process.env.OPEN_NOTIFY_API_URL);
    const { people, number } = response.data;

    // const updatedPeople = [
    //   { name: "Jasmin Moghbeli", craft: "ESA", nameSlug: "Jasmin_Moghbeli" },
    //   { name: "Andreas Mogensen", craft: "ESA", nameSlug: "Andreas_Mogensen" },
    //   { name: "Satoshi Furukawa", craft: "ISS", nameSlug: "Satoshi_Furukawa" },
    //   {
    //     name: "Konstantin Borisov",
    //     craft: "ISS",
    //     nameSlug: "Konstantin_Borisov",
    //   },
    //   { name: "Oleg Kononenko", craft: "NASA", nameSlug: "Oleg_Kononenko" },
    //   { name: "Nikolai Chub", craft: "ISS", nameSlug: "Nikolai_Chub" },
    //   { name: "Loral O'Hara", craft: "NASA", nameSlug: "Loral_O'Hara" },
    // ];
    // const number = updatedPeople.length;

    //modifying people array to have name slugs using slugify library
    const updatedPeople = people.map((person) => {
      const updatedPerson = {
        ...person,
        nameSlug: slugify(person.name, "_"),
      };
      return updatedPerson;
    });

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
    res.render("people.ejs", {
      error,
      message: "Oops! Something went wrong. Please try again later!",
    });
    console.log(error.message);
  }
};

export default getPeople;
