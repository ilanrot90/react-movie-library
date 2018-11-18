import { OPEN_MODAL, CLOSE_MODAL } from "../actionTypes";

export const openMovieModal = (movieId, tag) => {
  return {
    type: OPEN_MODAL,
    payload: {
      movieId,
      tag
    }
  };
}

export const closeMovieModal = () => {
  return {
    type: CLOSE_MODAL
  };
}
