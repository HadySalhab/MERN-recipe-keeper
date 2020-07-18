import { SET_CURRENT, ADD_RECIPE, DELETE_RECIPE } from "./types";

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

export const deleteRecipe = (id) => {
	return {
		type: DELETE_RECIPE,
		payload: id,
	};
};
