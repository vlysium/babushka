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
  filterButtons.forEach((button) => button.classList.remove("disabled")); //enable filter buttons once the json database is loaded

  menuItems.forEach((item) => {
    if (filter == item.kategori || filter == "alle") {
      const clone = template.cloneNode(true).content;
      clone.querySelector("img").src = `resources/${item.billednavn}-md.jpg`;
      clone.querySelector("img").setAttribute("alt", `${item.navn}`);
      clone.querySelector(".title").textContent = `${item.navn}`;
      clone.querySelector(".description_short").textContent = `${item.kortbeskrivelse}`;
      clone.querySelector(".price").textContent = `${item.pris} kr,-`;
      clone.querySelector("article").addEventListener("click", () => showDetails(item));
      section.appendChild(clone);
    }
  });
} //display all data

function showDetails(item) {
  //console.log(item);
  const popUp = document.getElementById("popup");
  popUp.classList.add("viewing");
  popUp.querySelector("img").src = `resources/${item.billednavn}-md.jpg`;
  popUp.querySelector("img").setAttribute("alt", `${item.navn}`);
  popUp.querySelector(".title").textContent = `${item.navn}`;
  popUp.querySelector(".origin").textContent = `Oprindelsesregion: ${item.oprindelsesregion}`;
  popUp.querySelector(".price").textContent = `${item.pris} kr,-`;

  const lastChar = item.langbeskrivelse.charAt(item.langbeskrivelse.length - 1); //used in 5 lines below to shorten the condition

  if (item.langbeskrivelse == "") {
    popUp.querySelector(".description_long").textContent = `${item.kortbeskrivelse}.`;
  } else {
    if (lastChar != "." && lastChar != "!" && lastChar != " ") {
      //checks if the last character of the string is a period, exclamation mark or space, concatinates with a period if the last character isn't a period or exclamation mark
      popUp.querySelector(".description_long").textContent = `${item.langbeskrivelse}.`;
    } else popUp.querySelector(".description_long").textContent = `${item.langbeskrivelse}`;
  } //if the item doesn't have a long description, show the short description instead

  document.getElementById("close").addEventListener("click", () => {
    popUp.classList.remove("viewing");
    popUp.classList.add("closing");
    setTimeout(() => {
      popUp.classList.remove("closing");
    }, 600); //delay by 0.6 seconds
  }); //close button
} //display data on selected card
