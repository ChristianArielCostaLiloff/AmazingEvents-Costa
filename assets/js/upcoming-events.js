const container = document.getElementById("main-content");
const presentation = document.getElementById("presentation");

/* Definimos un nuevo array con los eventos futuros */

/* let futureEvents = data.events.filter(futureEvent); */
/* function futureEvent(event) {
  return data.currentDate < event.date;
} */

let futureEvents = data.events.filter((event) => data.currentDate < event.date);

/* Los ordenamos segun la fecha */
/* Usamos la funcion getCard por cada elemento en el nuevo array */
futureEvents.sort((a, b) => (a.date > b.date ? 1 : -1)).forEach(createCard);

presentationCard(futureEvents[0]);

function presentationCard(event) {
  presentation.innerHTML = `
    <section
          class="presentation__content presentation__content--upcoming-past"
        >
          <h2>Next Event</h2>
          <h3>${event.name}</h3>
          <p>
            ${event.description}
          </p>
          <div class="presentation__info">
            <p>${event.assistance || event.estimate} / ${event.capacity}</p>
            <p>Price: $${event.price}</p>
          </div>
          <div class="card__price presentation__click">
            <a href="#" class="card__price-link">Show more</a>
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
              <a href="" class="card__price-link">Show more</a>
              <p>$${event.price}</p>
          </div>
        </article>
  `;
}
