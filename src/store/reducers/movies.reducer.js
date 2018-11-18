import { GET_MOVIES, MOVIES_SUCCESS, ADD_MOVIE, REMOVE_MOVIES, UPDATE_MOVIES } from "../actionTypes";

const initialState = {
    moviesResult: [],
};

export default function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES:
    console.log(state, action.payload);
      return { ...state, moviesResult: action.payload };

    case  MOVIES_SUCCESS:
      return { ...state, isLoading: action.payload.isLoading };

    case ADD_MOVIE:
      return { ...state, moviesResult: [ ...state.moviesResult, action.payload] };
      
    case REMOVE_MOVIES:
      return { ...state, moviesResult: action.payload.movies };

    case UPDATE_MOVIES:
      return { ...state, moviesResult: action.payload };

    default:   
      return state;
  }
}