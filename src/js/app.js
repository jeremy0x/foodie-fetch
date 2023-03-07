// fadeIn animation after page load
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const heroText = document.querySelector(".hero-text");
  const quote = document.querySelector(".quote");
  const searchBar = document.querySelector(".search-bar");
  const footer = document.querySelector(".footer");

  navbar.classList.add("animate");
  setTimeout(() => {
    heroText.classList.add("animate");
  }, 200);
  setTimeout(() => {
    quote.classList.add("animate");
  }, 400);
  setTimeout(() => {
    searchBar.classList.add("animate");
  }, 600);
  setTimeout(() => {
    footer.classList.add("animate");
  }, 800);
});

// rendering random food quotes
/* 💭
! for unknown reasons, not importing the foodQuotes variable doesn't show 
! any error. The foodQuotes variable is still accessible even though it's
! not imported in this file. */
/* 💡
 * If the foodQuotes variable is declared in another file in the same root
 * directory and that file has been included in the HTML file before this
 * file that uses the variable, then the variable will be accessible here,
 * even if it's not explicitly imported.
 * This is because all scripts included in the HTML file are loaded into a
 * global scope, so any variables or functions declared in one script can
 * be accessed by any other scripts included afterwards. */
// console.log(foodQuotes);
const quotesContainer = document.getElementById("quote");
renderQuotes();

// function definitions
function renderQuotes() {
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
}

// variables declaration
const searchBtn = document.getElementById("search-btn");
const searchTitle = document.getElementById("search-result-title");
const searchResults = document.getElementById("search-results");
const modal = document.getElementById("details-modal");
const error = document.getElementById("error");
const overlay = document.getElementById("overlay");

// get recipes on search
searchBtn.addEventListener("click", searchRecipes);

// function definitions
async function searchRecipes(event) {
  event.preventDefault();
  const searchQuery = document.getElementById("search-bar").value.trim();
  // console.log(searchQuery);

  // input check
  if (searchQuery === "") {
    error.textContent = "Please enter an ingredient to search for recipe(s) 🥞";
    error.classList.remove("hidden");
    return;
  }
  // remove previous content
  searchTitle.textContent = "";
  error.textContent = "";
  // add loader
  addLoader();

  // fetch recipes
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQuery}`
    );
    const data = await res.json();
    // console.log(data.meals);
    let searchResultsContent = "";
    // fade in results
    searchTitle.classList.add("fade-in");
    searchResults.classList.add("fade-in");

    if (data.meals) {
      // add results title
      searchTitle.textContent = `Recipe Ideas for ${searchQuery
        .charAt(0)
        .toUpperCase()}${searchQuery.slice(1)}`;
      // display search results | meal cards
      searchResultsContent = renderRecipes(data, searchResultsContent);
      searchResults.innerHTML = searchResultsContent;
      // add event listener to each recipe button for modal
      const recipeBtn = document.querySelectorAll(".recipe-btn");
      getRecipeDetails(recipeBtn);
    } else {
      searchResults.innerHTML = "";
      displayError(searchQuery);
    }

    searchTitle.classList.remove("hidden");
    clearSearchBar();
  } catch (error) {
    error.textContent = error.message;
    console.error(error);
  }
}

function displayError(searchQuery) {
  const errorMessages = [
    `Sorry, we couldn't find any recipes for ${searchQuery}. Looks like the kitchen gods are being a bit fickle today.`,
    `We searched high and low, but unfortunately, there are no recipes for ${searchQuery} in our database. Looks like it's time to get creative in the kitchen!`,
    `Looks like ${searchQuery} is giving our recipe database a run for its money. We'll keep searching, but in the meantime, maybe try a different ingredient?`,
    `Our recipe database is feeling a bit lonely - it's not finding any matches for ${searchQuery}. Maybe give it some company with another ingredient?`,
    `Oops, it looks like our recipe database is playing hard to get. We'll keep trying to find the perfect recipe for ${searchQuery}.`,
    `We're sorry, but ${searchQuery} is a little too elusive for our recipe database. Looks like we'll need to call in some culinary reinforcements!`,
  ];
  error.classList.remove("hidden");
  const randomIndex = Math.floor(Math.random() * errorMessages.length);
  const errorMessage = errorMessages[randomIndex];
  error.textContent = `${errorMessage}`;
}

function getRecipeDetails(recipeBtn) {
  recipeBtn.forEach((btn) =>
    btn.addEventListener("click", async () => {
      const mealId = btn.getAttribute("data-id");
      let modalContent = "";

      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        const data = await res.json();
        // console.log(data.meals);
        const mealDetail = data.meals[0];
        // console.log(mealDetail.idMeal);
        const videoId = mealDetail.strYoutube.split("?v=")[1];

        // filling in the modal with meal details
        modalContent += `
          <div class="relative rounded-lg bg-gray-700 max-w-4xl mx-auto">
            <!-- Modal header -->
            <div
              class="flex items-center justify-between rounded-t border-b border-gray-600 p-5"
            >
              <h3
                class="text-clamp-12-17 font-medium capitalize text-white"
                id="modal-recipe-title"
              >
                ${mealDetail.strMeal} 🥘
              </h3>
              <button
                type="button"
                id="close-btn"
                class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-600 hover:text-white"
                onclick="closeModal()"
              >
                <svg
                  aria-hidden="true"
                  class="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->
            <div class="space-y-6 p-6">
              <div class="flex flex-wrap items-center justify-between gap-4">
                <h3 class="text-clamp-12-17">Recipe Preparation 📝🍳</h3>
                <div class="rounded border px-4 py-0.5 md:px-8">
                  <span
                    class="text-center text-sm font-semibold text-white"
                    id="modal-recipe-category"
                  >
                    🍽️ ${mealDetail.strCategory}
                  </span>
                </div>
              </div>
              <p
                class="text-sm leading-relaxed text-gray-400 md:text-base"
                id="modal-preparation-instructions"
              >
                ${mealDetail.strInstructions.replace(/\n/g, "<br>")}
              </p>
            </div>
            <!-- Modal footer -->
            <div
              class="flex flex-col items-center gap-8 space-x-2 rounded-b border-t border-gray-600 p-6"
            >
              <h3 class="text-clamp-12-17 text-center">Recipe Tutorial Video 🎥👨‍🍳</h3>
              <div class="h-full w-full">
                <iframe
                  id="modal-yt-video"
                  class="video-embed mx-auto"
                  src="https://www.youtube.com/embed/${videoId}"
                  title="Recipe Tutorial Video"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        `;
      } catch (error) {
        console.error(error);
      }

      modal.innerHTML = modalContent;
      modal.classList.remove("hidden");
      overlay.classList.remove("hidden");
    })
  );
}

function renderRecipes(data, searchResultsContent) {
  data.meals.forEach((meal) => {
    searchResultsContent += `
      <div
        class="card mx-auto mb-4 w-sm max-w-full border-spacing-4 rounded-lg border border-gray-700 bg-gray-800 shadow"
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
            class="text-xl mb-2 text-center font-medium text-white"
          >
            ${meal.strMeal}
          </h5>
          <div class="flex w-full items-center justify-center">
            <button
              class="recipe-btn mt-4 inline-flex items-center rounded-lg bg-teal-600 px-3 py-2 text-center text-sm font-medium text-slate-900 transition duration-300 ease-in-out hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-amber-400"
              id="recipe-btn"
              data-id="${meal.idMeal}"
              type="button"
            >
              Recipe Details 🍲
            </button>
          </div>
        </div>
      </div>
    `;
  });
  return searchResultsContent;
}

function addLoader() {
  searchResults.innerHTML = `
    <div class="loading">
      <div class="dot dot-1"></div>
      <div class="dot dot-2"></div>
      <div class="dot dot-3"></div>
    </div>
  `;
}

function clearSearchBar() {
  let searchContent = document.getElementById("search-bar");
  searchContent.value = "";
}

function closeModal() {
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
}

// close modal when overlay is clicked
window.addEventListener("click", function (event) {
  if (event.target == modal && !modal.classList.contains("hidden")) {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }
});
