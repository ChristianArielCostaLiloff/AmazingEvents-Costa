const container = document.getElementById("main-content");
const navCheckbox = document.getElementById("container-check");
const navSearchCard = document.querySelector(".main-nav");

showContent();

//Functions
//async funtion for data from API
async function showContent() {
  let data;
  try {
    let dataRemote = await (
      await fetch("https://mind-hub.up.railway.app/amazing?order=asc")
    ).json();
    data = dataRemote;
  } catch (error) {
    alert("Unable to import data from API showing local data");
    data = dataLocal;
  }
  //Create categories
  let categories = data.events.map((event) => event.category);
  categories = new Set([...categories]);
  categories.forEach(createCheckbox);
  //Show all cards in first instance
  data.events.forEach(createCard);

  //Event
  navSearchCard.addEventListener("input", function () {
    let sortCardByCategory = Array.from(
      document.querySelectorAll("input[name='category']:checked")
    ).map((node) => node.value);

    let sortCardByText = document
      .getElementById("search-card")
      .value.toLowerCase();

    let sortedCard = data.events.filter(
      (event) =>
        event.name.toLowerCase().includes(sortCardByText) &&
        (sortCardByCategory.includes(event.category) ||
          sortCardByCategory.length < 1)
    );

    clearHtml(container);
    sortedCard.forEach(createCard);
    //0 matches
    if (sortedCard.length < 1) {
      container.innerHTML = "<h2>No elements to display</h2>";
    }
  });
}
function clearHtml(domElement) {
  domElement.innerHTML = "";
}
function createCheckbox(category) {
  navCheckbox.innerHTML += `
    <label>
      <input
        type="checkbox"
        name="category"
        value="${category}"
      />
      ${category}
    </label>
  `;
}
function createCard(event) {
  date = new Date(event.date).toDateString();
  container.innerHTML += `
  <article class="card">
          <div class="card__content">
            <h3>${date}</h3>
            <h5>${event.name}</h5>
            <figure><img src="${event.image}" alt="${event.name} picture"></figure>
            <hr>
            <p>${event.description}</p>
          </div>
          <div class="card__price">
              <a href="./html/event.html?id=${event._id}" class="card__price-link">Show more</a>
              <p>$${event.price}</p>
          </div>
        </article>
  `;
}
