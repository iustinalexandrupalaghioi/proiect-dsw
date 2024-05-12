import axios from "axios";
import "dotenv/config";

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

    // extract unique crafts from API response
    const crafts = [...new Set(people.map((person) => person.craft))];

    //group people by their crafts
    let peopleGroupedByCraft = [];
    crafts.forEach((craft, index) => {
      peopleGroupedByCraft[index] = people.filter(
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
    console.log(error.message);
  }
};

export default getPeople;
