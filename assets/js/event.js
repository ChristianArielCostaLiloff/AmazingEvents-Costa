let container = document.getElementById("container-details");
let id = location.search.slice(4);

let eventDetail = getData().events.filter((event) => event.id == id);

printEventInfo(eventDetail[0]);

function getData() {
  return data;
}

function printEventInfo(event) {
  container.innerHTML = `
    <article class="event">
      <figure>
        <img src="${event.image}" alt="${event.name} image" />
      </figure>
      <div class="details">
        <div>
          <h2>${event.name}</h2>
          <p>${event.description}</p>
        </div>
        <div>
          <div class="details-info">
            <p>Date: ${event.date}</p>
            <p>Place: ${event.place}</p>
          </div>
          <div class="details-info">
            <p>
              Joined:${event.assistance || event.estimate}/${event.capacity}
            </p>
            <p>Price: $${event.price}</p>
          </div>
        </div>
      </div>
    </article>
    `;
}
