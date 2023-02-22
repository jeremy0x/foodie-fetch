// fadeIn animation after page load
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const header = document.querySelector(".header");
  const searchBar = document.querySelector(".search-bar");
  const footer = document.querySelector(".footer");

  navbar.classList.add("animate");

  setTimeout(function () {
    header.classList.add("animate");
  }, 500);

  setTimeout(function () {
    searchBar.classList.add("animate");
  }, 1000);

  setTimeout(function () {
    footer.classList.add("animate");
  }, 1500);
});

// rendering random food quotes
import { foodQuotes } from "./food-quotes.js";
// console.log(foodQuotes);
const quotesContainer = document.getElementById("quote");
const randomIndex = Math.floor(Math.random() * foodQuotes.length);
const randomQuote = foodQuotes[randomIndex];
quotesContainer.innerHTML = `
<p>
 <i class="fa-solid fa-quote-left"></i>
 <span>${randomQuote.quote}</span> 
 <i class="fa-solid fa-quote-right"></i> 
 <br />
 <i class="fa-regular fa-comments"></i>
 &nbsp;
 <span class="font-semibold"> ${randomQuote.author}</span>
</p>
`;

// fetching from the API and implementation
const searchBtn = document.getElementById("search-btn");
const searchTitle = document.getElementById("search-result-title");
const searchResults = document.getElementById("search-results");

searchBtn.addEventListener("click", getMealsFromQuery);

function getMealsFromQuery(event) {
  event.preventDefault();
  const searchQuery = document.getElementById("search-bar").value.trim();
  // console.log(query);

  searchTitle.textContent = "";

  // Add a loading spinner to the page
  searchResults.innerHTML = `
  <div class="loading">
    <div class="dot dot-1"></div>
    <div class="dot dot-2"></div>
    <div class="dot dot-3"></div>
  </div>
  `;

  // fetch data and render search results
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQuery}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.meals);
      let searchResultsContent = "";

      if (data.meals) {
        // results title
        searchTitle.textContent = `Recipe Ideas for ${searchQuery
          .charAt(0)
          .toUpperCase()}${searchQuery.slice(1)}`;

        // search results | meal cards
        data.meals.forEach((meal) => {
          searchResultsContent += `
            <div
              class="card mx-auto mb-4 max-w-sm border-spacing-4 rounded-lg border border-gray-700 bg-gray-800 shadow"
            >
              <div class="card-img-container rounded">
                <img
                  class="rounded-t-lg object-cover"
                  src="${meal.strMealThumb}"
                  alt="card image"
                />
              </div>
              <div class="p-5">
                <h5
                  class="text-2xl mb-2 text-center font-semibold tracking-tight text-white"
                >
                  ${meal.strMeal}
                </h5>
                <div class="flex w-full items-center justify-center">
                  <button
                    class="recipe-btn mt-4 inline-flex items-center rounded-lg bg-teal-600 px-3 py-2 text-center text-sm font-medium text-white transition duration-300 ease-in-out hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-amber-400"
                    id="recipe-btn"
                    data-modal-target="modal"
                    data-modal-toggle="modal"
                    type="button"
                  >
                    Recipe Details 🍲
                  </button>
                </div>
              </div>
            </div>
          `;
        });
      } else {
        searchTitle.textContent = `We couldn't find a matching recipe for your ingredient 😕`;
        searchResults.innerHTML = "";
      }
      searchTitle.classList.remove("hidden");

      // render search results
      setTimeout(() => {
        if (searchResultsContent != 0) {
          searchResults.innerHTML = searchResultsContent;
        }
      }, 2000); // wait 1 second before rendering search results to show loader for longer time
    });
}

// Search Results HTML
/*
  <div
    class="mx-auto mb-4 max-w-sm border-spacing-4 rounded-lg border border-gray-700 bg-gray-800 shadow"
  >
    <div class="card-img-container">
      <img
        class="rounded-t-lg object-cover"
        src="https://unsplash.it/700/700"
        alt="card image"
      />
    </div>
    <div class="p-5">
      <h5
        class="text-clamp-12-17 mb-2 text-center font-semibold tracking-tight text-white"
      >
        Recipe Name
      </h5>
      <div class="flex w-full items-center justify-center">
        <button
          class="mt-4 inline-flex items-center rounded-lg bg-teal-600 px-3 py-2 text-center text-sm font-medium text-white transition duration-300 ease-in-out hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-800"
          id="recipe-btn"
          data-modal-target="modal"
          data-modal-toggle="modal"
          type="button"
        >
          Recipe Details 🍲
        </button>
      </div>
    </div>
  </div>
*/
