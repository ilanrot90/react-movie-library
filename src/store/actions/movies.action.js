import { getMovies } from "../../services/api.service";
import { GET_MOVIES, UPDATE_MOVIES, ADD_MOVIE } from "../actionTypes";

function returnMovies(movies) {
  return {
    type: GET_MOVIES,
    payload: movies
  }
}

export function loadMovies() {
    return dispatch => {
      let movies = getMovies()

      return Promise.all(movies)
              .then(result => {
                  return dispatch(returnMovies(result))
      })
    }  
};

export function updateMovie(movies) {
  return {
    type: UPDATE_MOVIES,
    payload: movies
  }
}

export function addMovie(movie) {
  return {
    type: ADD_MOVIE,
    payload: movie
  }
}