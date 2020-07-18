import {
	SET_CURRENT,
	ADD_RECIPE,
	DELETE_RECIPE,
	EDIT_RECIPE,
	CLEAR_EDIT_RECIPE,
	UPDATE_RECIPE,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	CLEAR_ALERT,
} from "./types";
import axios from "axios";
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
export const register = (formData) => async (dispatch) => {
	try {
		const res = await axios({
			method: "post",
			url: "/api/auth/register",
			headers: {
				"Content-Type": "application/json",
			},
			data: formData,
		});
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data.token,
		});
		localStorage.setItem("recipe-token", res.data.token);
	} catch (err) {
		if (err.response) {
			let message = err.response.data.error;
			if (message.startsWith("Duplicate")) {
				message = "Email Aready In Use. Please Choose Another Email";
			}
			dispatch({
				type: REGISTER_FAIL,
				payload: message,
			});
		} else {
			dispatch({
				type: REGISTER_FAIL,
				payload: "Something went wrong.Please check network connection",
			});
		}

		setTimeout(() => {
			dispatch(clearAlert());
		}, 3000);
		localStorage.removeItem("recipe-token");
	}
};

export const clearAlert = () => {
	return {
		type: CLEAR_ALERT,
	};
};
// Login User
// Logout User
// Clear Alert
