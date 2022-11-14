const { parse } = require("csv-parse");
const fs = require("fs");

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    0.36 < planet["koi_insol"] &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

const habitablePlanets = [];

fs.createReadStream("kepler_data.csv")
  // pipe = connect readable stream `source` to writable stream `destination`
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
  })
  .on("error", (err) => {
    console.error(err);
  })
  .on("end", () => {
    console.log(`${habitablePlanets.length} planets found!`);
    console.log(habitablePlanets.map((planet) => planet.kepler_name));
  });
