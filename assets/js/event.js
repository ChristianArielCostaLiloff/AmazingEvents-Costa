let container = document.getElementById("container-details");

showContent();

//Functions
async function showContent() {
  let data;
  try {
    data = await (
      await fetch(
        "https://mh-amazing.herokuapp.com/amazing/" + location.search.slice(4)
      )
    ).json();
  } catch (error) {
    alert("Unable to import data from API");
  }
  printEventInfo(data.event);
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
