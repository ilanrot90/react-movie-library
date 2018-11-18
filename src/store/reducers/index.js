import { combineReducers } from "redux";
import movies from "./movies.reducer";
import modalState from "./modal.reducer";

const rootReducer = combineReducers({
  movies,
  modalState
});

export default rootReducer;
