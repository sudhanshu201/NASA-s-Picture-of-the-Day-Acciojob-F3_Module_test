const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const currentImageContainer = document.getElementById("current-image-container");
const searchHistory = document.getElementById("search-history");

let searches = JSON.parse(localStorage.getItem("searches")) || [];

getCurrentImageOfTheDay();

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const date = searchInput.value;
  getImageOfTheDay(date);
});

function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  const apikey1 = "pZuoa3KGvXpVVq5iV8dOMI3nYb7Q0WpVvBsTuUbF"
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apikey1}&date=${currentDate}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      currentImageContainer.innerHTML = `
        <h2>Picture of the Day (${data.date})</h2>
        <img src="${data.url}" alt="${data.title}">
        <p>${data.explanation}</p>
      `;
    })
    .catch((error) => console.log(error));
}

function getImageOfTheDay(date) {
    const apikey2 = "pZuoa3KGvXpVVq5iV8dOMI3nYb7Q0WpVvBsTuUbF"

  const url = `https://api.nasa.gov/planetary/apod?api_key=${apikey2}&date=${date}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      currentImageContainer.innerHTML = `
        <h2>Picture of the Day (${data.date})</h2>
        <img src="${data.url}" alt="${data.title}">
        <p>${data.explanation}</p>
      `;
      saveSearch(date);
      addSearchToHistory();
    })
    .catch((error) => console.log(error));
}

function saveSearch(date) {
  searches.push(date);
  localStorage.setItem("searches", JSON.stringify(searches));
}

function addSearchToHistory() {
  searchHistory.innerHTML = "";
  searches.forEach((search) => {
    const listItem = document.createElement("li");
    listItem.textContent = search;
    listItem.addEventListener("click", () => {
      getImageOfTheDay(search);
    });
    searchHistory.appendChild(listItem);
  });
}

addSearchToHistory();

// function to fetch data from NASA API and display it in the UI
async function fetchData(date) {
    const apiKey3 = "pZuoa3KGvXpVVq5iV8dOMI3nYb7Q0WpVvBsTuUbF";
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey3}&date=${date}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      // check if the response has an error message
      if (data.error) {
        throw new Error(data.error.message);
      }
      // display the image of the day
      displayData(data);
      // save the search to local storage
      saveSearch(date);
      // add the search to the search history
      addSearchToHistory(date);
    } catch (error) {
      console.log(error);
      alert("Failed to retrieve data from NASA API");
    }
  }
  
  // function to display data in the UI
  function displayData(data) {
    const container = document.getElementById("current-image-container");
    container.innerHTML = `
      <div class="card">
        <img src="${data.url}" class="card-img-top" alt="NASA Picture of the Day">
        <div class="card-body">
          <h5 class="card-title">${data.title}</h5>
          <p class="card-text">${data.explanation}</p>
        </div>
      </div>
    `;
  }
  
  // function to save a search to local storage
  function saveSearch(date) {
    const searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
  }
  
  // function to add a search to the search history
  function addSearchToHistory(date) {
    const history = document.getElementById("search-history");
    const listItem = document.createElement("li");
    listItem.textContent = date;
    listItem.classList.add("search-item");
    history.appendChild(listItem);
    // add a click event listener to the list item
    listItem.addEventListener("click", function () {
      fetchData(date);
    });
  }
  
  // function to initialize the page
  function initializePage() {
    // get the current date and fetch the data
    const currentDate = new Date().toISOString().split("T")[0];
    fetchData(currentDate);
    // add an event listener to the search form
    const form = document.getElementById("search-form");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const searchInput = document.getElementById("search-input");
      const date = searchInput.value;
      fetchData(date);
      searchInput.value = "";
    });
    // add the past searches to the search history
    const searches = JSON.parse(localStorage.getItem("searches")) || [];
    for (const search of searches) {
      addSearchToHistory(search);
    }
  }
  
  initializePage();

  function addSearchToHistory(date) {
    // get existing searches from local storage or create a new array if none exist
    let searches = JSON.parse(localStorage.getItem("searches")) || [];
    
    // add the new search to the beginning of the array
    searches.unshift(date);
    
    // limit the array to 5 items
    searches = searches.slice(0, 5);
    
    // save the updated array back to local storage
    localStorage.setItem("searches", JSON.stringify(searches));
    
    // clear the search history list
    searchHistory.innerHTML = "";
    
    // display the updated search history list
    for (let i = 0; i < searches.length; i++) {
      const li = document.createElement("li");
      li.textContent = searches[i];
      li.addEventListener("click", () => {
        getImageOfTheDay(searches[i]);
      });
      searchHistory.appendChild(li);
    }
  }
  
  // when the search form is submitted
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const date = searchInput.value;
    
    getImageOfTheDay(date);
    
    saveSearch(date);
    
    searchInput.value = "";
  });
  
  // on page load, display the current image of the day
  getCurrentImageOfTheDay();
  