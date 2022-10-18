const container = document.getElementById("main-content");
/* const category = document.querySelectorAll("input[name='category']"); */
const navSearchCard = document.querySelector(".main-nav");

function getData() {
  return data;
}
navSearchCard.addEventListener("input", function () {
  let sortCardByCategory = Array.from(
    document.querySelectorAll("input[name='category']:checked")
  ).map((node) => node.value);

  let sortCardByText = document
    .getElementById("card-search")
    .value.toString()
    .toLowerCase();

  let sortedCard = data.events.filter(function (event) {
    return (
      event.name.toLowerCase().includes(sortCardByText) &&
      sortCardByCategory.includes(event.category) /* ||
      (sortCardByText == null && sortCardByCategory.includes(event.category)) */
    );
  });

  clearHtml(container);
  sortedCard.sort((a, b) => (a.date > b.date ? 1 : -1)).forEach(getCard);
});

data.events.forEach(getCard);

function clearHtml(domElement) {
  domElement.innerHTML = "";
}

function getCard(event) {
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
              <a href="" class="card__price-link">Show more</a>
              <p>$${event.price}</p>
          </div>
        </article>
  `;
}
