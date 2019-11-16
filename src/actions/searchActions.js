import { FETCHED_SEARCH, UI_LOADING_INIT, UI_LOADING_COMPLETE } from "./types";

// `https://www.omdbapi.com/?apikey=${api}&t=${search}` title
// `https://img.omdbapi.com/?apikey=${api}&` poster
// `https://www.omdbapi.com/?apikey=${api}&s=${title}` search

const api = "48946d13";

//general search, can return multiple pages, iterate
export const fetchMovies = search => (dispatch, getState) => {
  let pageCount = 1;
  let results = {
    Search: [],
    totalResults: 0,
    Response: "False"
  };

  //fetch, keep fetching if Response is true until all pages have been fetched
  const iterate = () =>
    new Promise((resolve, reject) => {
      fetch(
        `https://www.omdbapi.com/?apikey=${api}&s=${search}&page=${pageCount}`
      )
        .then(res => res.json())
        .then(movies => {
          if (movies.Response === "True") {
            results.totalResults = movies.totalResults;
            results.Response = movies.Response;
            results.Search.push(movies.Search);
            pageCount++;
            // resolve();
            iterate();
          } else if (results.totalResults === 0) {
            results.Error = "Movie not found!";
            dispatch({
              type: FETCHED_SEARCH,
              payload: results
            });
          } else if (movies.Response === "False") {
            dispatch({
              type: FETCHED_SEARCH,
              payload: results
            });
            dispatch({
              type: UI_LOADING_COMPLETE
            });
          }
        });
      resolve();
    });

  dispatch({
    type: UI_LOADING_INIT
  });
  iterate();
};
