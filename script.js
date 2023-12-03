const carsArray = [
  {
    id: 1,
    name: "Mercedes-Benz 190E 2.3 16",
    price: 40000,
    description:
      "A timeless piece of 80's german engineering. The 190E provides a smooth ride with reliability on the road.",
    action: "Remove",
  },
  {
    id: 2,
    name: "Mercedes-Benz W124 500E",
    price: 80000,
    description:
      "The Mercedes-Benz 500 E (W124.036) is a high-performance version of the W124 sold by Mercedes-Benz from 1990 to 1995.",
    action: "Remove",
  },
  {
    id: 3,
    name: "BMW E46 M3",
    price: 70000,
    description:
      "The BMW M3 is a high-performance version of the BMW 3 Series, developed by BMW's in-house motorsport division, BMW M GmbH.",
    action: "Remove",
  },
  {
    id: 4,
    name: "Porsche 911 Turbo",
    price: 90000,
    description:
      "The Porsche 911 Turbo was unveiled at the 2006 Geneva Motor Show in Switzerland as the successor of the 996 Turbo.",
    action: "Remove",
  },
];

function displayCars(carsData) {
  const carsTable = document.querySelector(".product-list");
  carsData.forEach((car) => {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
        <td>${car.id}</td>
        <td>${car.name}</td>
        <td>${car.price}</td>
        <td>${car.description}</td>
        <td><button class="remove-button">${car.action}</button></td>
        `;
    carsTable.appendChild(tableRow);
  });
}

displayCars(carsArray);
