import {
	SET_CURRENT,
	ADD_RECIPE,
	DELETE_RECIPE,
	EDIT_RECIPE,
	CLEAR_EDIT_RECIPE,
	UPDATE_RECIPE,
} from "./types";

export const setCurrent = (recipe) => {
	return {
		type: SET_CURRENT,
		payload: recipe,
	};
};

export const addRecipe = (recipe) => {
	return {
		type: ADD_RECIPE,
		payload: recipe,
	};
};
export const updateRecipe = (recipe) => (dispatch) => {
	dispatch({ type: UPDATE_RECIPE, payload: recipe });
	dispatch(setCurrent(recipe));
};

export const deleteRecipe = (id) => {
	return {
		type: DELETE_RECIPE,
		payload: id,
	};
};

export const editRecipe = (recipe) => {
	return {
		type: EDIT_RECIPE,
		payload: recipe,
	};
};

export const clearEditRecipe = () => {
	return {
		type: CLEAR_EDIT_RECIPE,
	};
};

// Load User
// Register User
// Login User
// Logout User
// Clear Alert
