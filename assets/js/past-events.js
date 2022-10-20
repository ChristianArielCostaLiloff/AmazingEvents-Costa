const container = document.getElementById("main-content");

const navSearchCard = document.querySelector(".main-nav");

let pastEvents = data.events.filter((event) => event.date < data.currentDate);

pastEvents.sort((a, b) => (a.date < b.date ? 1 : -1)).forEach(createCard);

presentationCard(pastEvents[0]);

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
      sortCardByCategory.includes(event.category) &&
      getData().currentDate > event.date
  );

  clearHtml(container);
  sortedCard.sort((a, b) => (a.date < b.date ? 1 : -1)).forEach(createCard);

  if (sortedCard.length < 1) {
    container.innerHTML='<h2>No elements to display</h2>'
  }
});

//Functions
function getData() {
  return data;
}

function clearHtml(domElement) {
  domElement.innerHTML = "";
}

function presentationCard(event) {
  presentation.innerHTML = `
    <section
          class="presentation__content presentation__content--upcoming-past"
        >
          <h2>Recent Event</h2>
          <h3>${event.name}</h3>
          <p>
            ${event.description}
          </p>
          <div class="presentation__info">
            <p>${event.assistance || event.estimate} / ${event.capacity}</p>
            <p>Price: $${event.price}</p>
          </div>
          <div class="presentation__click card__price">
            <a href="../html/event.html?id=${event._id}" class="card__price-link">Show more</a>
          </div>
        </section>
        <figure
          class="presentation__picture presentation__picture--upcoming-past"
        >
          <img src="${event.image}" alt="${event.name} image" />
        </figure>
  `;
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
              <a href="../html/event.html?id=${event._id}" class="card__price-link">Show more</a>
              <p>$${event.price}</p>
          </div>
        </article>
  `;
}
