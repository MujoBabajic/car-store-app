const carsArray = [
  {
    id: 1,
    name: "Mercedes-Benz 190E 2.3 16",
    price: 23000,
    description:
      "A timeless piece of 80's german engineering. The 190E provides a smooth ride with reliability on the road.",
  },
  {
    id: 2,
    name: "Mercedes-Benz W124 500E",
    price: 38000,
    description:
      "The Mercedes-Benz 500 E (W124.036) is a high-performance version of the W124 sold by Mercedes-Benz from 1990 to 1995.",
  },
  {
    id: 3,
    name: "BMW E46 M3",
    price: 31000,
    description:
      "The BMW M3 is a high-performance version of the BMW 3 Series, developed by BMW's in-house motorsport division, BMW M GmbH.",
  },
  {
    id: 4,
    name: "Porsche 911 Turbo 997.1",
    price: 50000,
    description:
      "The Porsche 911 Turbo was unveiled at the 2006 Geneva Motor Show in Switzerland as the successor of the 996 Turbo.",
  },
  {
    id: 5,
    name: "BMW E39 M5",
    price: 33000,
    description:
      "The E39 M5 is assuredly the finest example of the perfect balance between a comfortable and a sporty sedan: in other words, an automotive Yin and Yang.",
  },
  {
    id: 6,
    name: "Audi R8 Gen1",
    price: 70000,
    description:
      "Audi’s R8 is a useable, reliable, and easy-to-drive supercar. The first-generation R8 still looks fresh today alongside newer supercars.",
  },
  {
    id: 7,
    name: "Aston Martin DB9",
    price: 61000,
    description:
      "The Aston Martin DB9 featured a V12 engine and weighed 25% less than its predecessor, the DB7, thanks to composite construction.",
  },
  {
    id: 8,
    name: "Nissan Silvia S15",
    price: 15000,
    description:
      "The S15 Silvia includes aggressive styling inside and out, updating the previous Silvia styling in-line with modern car design trends.",
  },
];

function displayCars(carsData) {
  const carsTable = document.querySelector(".product-list");
  carsData.forEach((car) => {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
        <td>${car.id}</td>
        <td>${car.name}</td>
        <td>${formatMoney(car.price)}</td>
        <td>${car.description}</td>
        <td><button class="remove-button">Remove</button></td>
        `;
    carsTable.appendChild(tableRow);
  });
}

function formatMoney(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

sortCars("nameasc");

function sortCars(order) {
  let sortedArray = [];

  if (order === "nameasc") {
    sortedArray = carsArray
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
  } else if (order === "namedesc") {
    sortedArray = carsArray
      .slice()
      .sort((a, b) => b.name.localeCompare(a.name));
  } else if (order === "priceasc") {
    sortedArray = carsArray.slice().sort((a, b) => a.price - b.price);
  } else if (order === "pricedesc") {
    sortedArray = carsArray.slice().sort((a, b) => b.price - a.price);
  }

  const carsTable = document.querySelector(".product-list");
  carsTable.innerHTML = "";

  displayCars(sortedArray);
}

document.querySelector("#sort-select").addEventListener("change", (event) => {
  sortCars(event.target.value);
});
