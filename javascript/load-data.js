const url = "https://babushka-dd8a.restdb.io/rest/menu";
const options = {
  headers: {
    "x-apikey": "600ec2fb1346a1524ff12de4",
  },
}; //json url

let menuItems;
let filter = "alle";

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll("div button");
  filterButtons.forEach(
    (button) => button.addEventListener("click", filterMenu) //add eventlistener to all buttons
  );
  fetchData();
});

async function fetchData() {
  const response = await fetch(url, options);
  menuItems = await response.json();
  display();
  //console.log(menuItems); //display array in console
} //fetch json

function filterMenu() {
  filter = this.dataset.category;
  document.querySelector(".selected").classList.remove("selected");
  this.classList.add("selected");
  document.querySelector("h2").textContent = this.textContent; //change h2 text content
  display();
}

function display() {
  const template = document.querySelector("template");
  const section = document.getElementById("section");
  section.textContent = "";

  const filterButtons = document.querySelectorAll("div button");
  filterButtons.forEach((button) => button.classList.remove("disabled")); //wait until the json database is loaded in before buttons are activated

  menuItems.forEach((item) => {
    if (filter == item.kategori || filter == "alle") {
      const clone = template.cloneNode(true).content;
      clone.querySelector("img").src = `resources/${item.billednavn}-md.jpg`;
      clone.querySelector(".title").textContent = `${item.navn}`;
      clone.querySelector(
        ".description_short"
      ).textContent = `${item.kortbeskrivelse}`;
      clone.querySelector(".price").textContent = `${item.pris} kr,-`;
      section.appendChild(clone);
    }
  });
}
