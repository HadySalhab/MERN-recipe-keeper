import { combineReducers } from "redux";
import recipeReducer from "./recipeReducer";

// Application State
export default combineReducers({
	recipes: recipeReducer,
});
