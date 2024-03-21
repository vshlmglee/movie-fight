const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue }) => {
  root.innerHTML = `
  <label><b>Search for a Movie</b></label>
  <input class="input"/>
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results">
      </div>
    </div>
  </div>
`;
  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  async function onInput(event) {
    //console.log(event.target.value);
    const movies = await fetchData(event.target.value);
    console.log(movies);

    resultsWrapper.innerHTML = "";

    if (!movies.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    dropdown.classList.add("is-active");
    for (let movie of movies) {
      const option = document.createElement("a");

      option.classList.add("dropdown-item");

      option.innerHTML = renderOption(movie);

      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = inputValue(movie);
        onOptionSelect(movie);
      });
      resultsWrapper.append(option);
    }
  }

  input.addEventListener("input", debounce(onInput, 1000));

  document.addEventListener("click", (event) => {
    //console.log(event);
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
