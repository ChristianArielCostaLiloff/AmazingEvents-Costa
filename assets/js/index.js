const container = document.getElementById("main-content");

for (let event of data.events) {
  getCard(event);
}

function getCard(event) {
  container.innerHTML += `
  <article class="card">
          <div class="card__info">
            <figure>
              <img src="${event.image}" alt="Image of ${event.name}" />
            </figure>
            <div class="card__title">
              <h4>${event.name}</h4>
              <p>${event.description}</p>
            </div>
          </div>
            <div class="card__price">
              <p>Price: $${event.price}</p>
              <a href="#">Show more</a>
            </div>
        </article>
  `;
}
