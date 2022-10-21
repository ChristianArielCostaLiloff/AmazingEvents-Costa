const container = document.getElementById("main-content");
const navSearchCard = document.querySelector(".main-nav");

getData().events.forEach(createCard);

//Event
navSearchCard.addEventListener("input", function () {
  let sortCardByCategory = Array.from(
    document.querySelectorAll("input[name='category']:checked")
  ).map((node) => node.value);

  let sortCardByText = document
    .getElementById("search-card")
    .value.toLowerCase();

  let sortedCard = getData().events.filter(
    (event) =>
      event.name.toLowerCase().includes(sortCardByText) &&
      sortCardByCategory.includes(event.category)
  );

  clearHtml(container);
  sortedCard.sort((a, b) => (a.date > b.date ? 1 : -1)).forEach(createCard);

  if (sortedCard.length < 1 || sortCardByCategory.length < 1) {
    container.innerHTML = "<h2>No elements to display</h2>";
  }
});

//Functions
function getData() {
  return data;
}

function clearHtml(domElement) {
  domElement.innerHTML = "";
}

function createCard(event) {
  container.innerHTML += `
  <article class="card">
          <div class="card__content">
            <h3>${event.date}</h3>
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
