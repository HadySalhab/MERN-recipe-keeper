import { combineReducers } from "redux";
import recipeReducer from "./recipeReducer";
import authReducer from "./authReducer";

// Application State
export default combineReducers({
	recipes: recipeReducer,
	auth: authReducer,
});
