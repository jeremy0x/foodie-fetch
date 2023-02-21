// fadeIn animation after page load
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const header = document.querySelector(".header");
  const searchBar = document.querySelector(".search-bar");
  const footer = document.querySelector(".footer");

  navbar.classList.add("animate");

  setTimeout(function () {
    header.classList.add("animate");
  }, 700);

  setTimeout(function () {
    searchBar.classList.add("animate");
  }, 1200);

  setTimeout(function () {
    footer.classList.add("animate");
  }, 1700);
});

// fetching from the API and implementation

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
