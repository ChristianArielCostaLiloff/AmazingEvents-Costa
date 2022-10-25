showContent();

async function showContent() {
  let data, dataUpcoming, dataPast;
  try {
    data = await (
      await fetch("https://mh-amazing.herokuapp.com/amazing")
    ).json();
    dataUpcoming = await (
      await fetch("https://mh-amazing.herokuapp.com/amazing?time=upcoming")
    ).json();
    dataPast = await (
      await fetch("https://mh-amazing.herokuapp.com/amazing?time=past")
    ).json();
  } catch (error) {
    alert("Unable to import data from API");
  }
  data.events.map((event) => {
    (event.percentage =
      ((event.assistance || event.estimate) / event.capacity) * 100),
      (event.revenue = (event.assistance || event.estimate) * event.price);
  });
  tableFeaturedData(document.getElementById("events-featured"), data.events);

  createStatisticsByDataAndTag(
    dataUpcoming,
    document.getElementById("upcoming-stats")
  );
  createStatisticsByDataAndTag(dataPast, document.getElementById("past-stats"));
}
//Show info by specific data in a specific tag
function createStatisticsByDataAndTag(data, domElement) {
  data.events.map((event) => {
    (event.percentage =
      ((event.assistance || event.estimate) / event.capacity) * 100),
      (event.revenue = (event.assistance || event.estimate) * event.price);
  });
  let categories = [
    ...new Set([...data.events.map((event) => event.category)]),
  ];
  let stats = statsByCategory(categories, data);
  tableStatisticsByCategories(domElement, stats);
}
//Object with statistics by categories
function statsByCategory(array, info) {
  array = array.map((category) => {
    let eventsSameCategory = info.events.filter(
      (event) => event.category == category
    );
    let statsPerCategory = eventsSameCategory.reduce(
      (j, k) => {
        return {
          category: k.category,
          revenue: j.revenue + k.revenue,
          totalJoined: j.totalJoined + (k.estimate || k.assistance),
          totalCapacity: j.totalCapacity + k.capacity,
        };
      },
      {
        category: "",
        revenue: 0,
        totalJoined: 0,
        totalCapacity: 0,
        percentageJoined: 0,
      }
    );
    statsPerCategory.percentageJoined = (
      (statsPerCategory.totalJoined / statsPerCategory.totalCapacity) *
      100
    ).toFixed(2);
    return statsPerCategory;
  });
  return array;
}
//Print rows
function tableFeaturedData(domElement, array) {
  let eventHighestPercentage = array.reduce((a, b) =>
    a.percentage > b.percentage ? a : b
  );
  let eventLowestPercentage = array.reduce((a, b) =>
    a.percentage < b.percentage ? a : b
  );
  let eventLargerCapacity = array.reduce((a, b) =>
    a.capacity > b.capacity ? a : b
  );
  domElement.innerHTML = `
    <td>${eventHighestPercentage.name} (${eventHighestPercentage.percentage}%)</td>
    <td>${eventLowestPercentage.name} (${eventLowestPercentage.percentage}%)</td>
    <td>${eventLargerCapacity.name} (${eventLargerCapacity.capacity})</td>
    `;
}
function tableStatisticsByCategories(domElement, array) {
  array.forEach((element) => {
    domElement.innerHTML += `
        <tr>
            <td>${element.category}</td>
            <td>$${element.revenue}</td>
            <td>${element.percentageJoined}%</td>
        </tr>
    `;
  });
}
