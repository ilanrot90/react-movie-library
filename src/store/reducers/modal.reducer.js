import { OPEN_MODAL, CLOSE_MODAL } from "../actionTypes";

const initialState = {
      isOpen: false, 
      tag: 'modal',
      movieId: undefined 
};

const modalState = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { isOpen: true, movieId: action.payload.movieId, tag: action.payload.tag };

    case CLOSE_MODAL:
      return { ...state, isOpen: false };

    default:
      return state;
  }
};

export default modalState;
