function searchSubmit() {
  let searchEl = document.getElementById("search-result");
  searchEl.style.display = "inline";

  let searchQuery = document.getElementById("searchQuery");
  let searchInput = document.getElementById("search-input").value;
  searchQuery.innerHTML = "Search results for " + searchInput;
}
