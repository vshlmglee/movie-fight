const fetchData = async (searchTerm) => {
  let response = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: "322273b4",
      s: searchTerm,
    },
  });

  if (response.data.Error) return [];

  return response.data.Search;
};

const onMovieSelect = async (movie) => {
  let response = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: "322273b4",
      i: movie.imdbID,
    },
  });

  if (response.data.Error) console.log([]);

  console.log(response.data);
  document.querySelector("#summary").innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetail) => {
  return `
  <article class="media">
  <figure class="media-left">
  <p class="image">
  <img src="${movieDetail.Poster}" />
    </p>
    </figure>
    <div class="media-content">
    <div class="content">
    <h1>${movieDetail.Title}</h1>
      <h4>${movieDetail.Genre}</h4>
      <p>${movieDetail.Plot}</p>
      </div>
      </div>
      </article>
      <article class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
      </article>
      <article class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
      </article>
      <article class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
      </article>
      <article class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
</article>  
`;
};

createAutoComplete({
  root: document.querySelector(".autocomplete"),
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;

    return `
    <img src="${imgSrc}" />
    ${movie.Title} (${movie.Year})
    `;
  },
  onOptionSelect(movie) {
    onMovieSelect(movie);
  },
  inputValue(movie) {
    return movie.Title;
  },
});
