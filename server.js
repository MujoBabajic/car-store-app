const http = require("http");
const fs = require("fs");
const qs = require("querystring");

const PORT = 3131;

const server = http.createServer(async (req, res) => {
  if (req.url === "/" && req.method === "GET") {
    fs.readFile("./index.html", async (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        const carsData = await fs.promises.readFile("./cars.json", "utf-8");
        const updatedFile = data
          .toString()
          .replace("{{inject_here}}", generateTableBody(JSON.parse(carsData)));
        res.end(updatedFile);
      }
    });
  } else if (req.url === "/styles.css" && req.method === "GET") {
    fs.readFile("./styles.css", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      }
    });
  } else if (req.url === "/script.js" && req.method === "GET") {
    fs.readFile("./script.js", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/javascript" });
        res.end(data);
      }
    });
  } else if (req.method === "POST" && req.url === "/submit") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const formData = qs.parse(body);

      const name = formData.name;
      const price = formData.price;
      const description = formData.description;

      const newCar = {
        name,
        price,
        description,
      };

      try {
        const data = await fs.promises.readFile("./cars.json", "utf-8");
        console.log("Data reading success");

        const carsArray = JSON.parse(data);
        carsArray.push(newCar);

        await fs.promises.writeFile("./cars.json", JSON.stringify(carsArray));
        console.log("Data writing success");

        res.writeHead(302, { Location: "/" });
        res.end();
      } catch (err) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server Error");
      }
    });
  } else if (req.method === "POST" && req.url === "/remove") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      try {
        const formData = qs.parse(body);
        const carToRemove = formData.name;

        const data = await fs.promises.readFile("./cars.json", "utf-8");
        const carsArray = JSON.parse(data);

        const updatedCars = carsArray.filter((car) => car.name !== carToRemove);

        await fs.promises.writeFile("./cars.json", JSON.stringify(updatedCars));
        res.writeHead(302, { Location: "/" });
        res.end();
      } catch (err) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server Error");
      }
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function generateTableBody(data) {
  const tableRows = data
    .map((car) => {
      return `<tr>
                <td>${car.name}</td>
                <td>${formatMoney(car.price)}</td>
                <td>${car.description}</td>
                <td><form action="/remove" method="POST">
                <input type="hidden" name="name" value="${car.name}" />
                <input type="submit" class="remove-button" value="Remove"/></form>
                </td>
            </tr>`;
    })
    .join("");

  return tableRows;
}

function formatMoney(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
