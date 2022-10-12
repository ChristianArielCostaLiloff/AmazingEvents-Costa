const container = document.getElementById("main-content");

for (let event of data.events) {
  getCard(event);
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
