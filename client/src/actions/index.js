import {
	SET_CURRENT,
	ADD_RECIPE,
	DELETE_RECIPE,
	EDIT_RECIPE,
	CLEAR_EDIT_RECIPE,
	UPDATE_RECIPE,
	AUTH_LOADING,
	AUTH_ERROR,
	AUTH_USER,
	RECIPE_ERROR,
	RECIPE_LOADING,
	GET_RECIPES,
	CLEAR_RECIPES_STATE,
} from "./types";
import axios from "../util/axios";

export const setCurrent = (recipe) => {
	return {
		type: SET_CURRENT,
		payload: recipe,
	};
};

export const getRecipes = () => async (dispatch) => {
	try {
		dispatch({
			type: RECIPE_LOADING,
		});
		const res = await axios({
			method: "get",
			url: "/api/recipes",
		});
		dispatch({
			type: GET_RECIPES,
			payload: res.data.data, // send api data to include mongoose id
		});
	} catch (err) {
		handleError(err, RECIPE_ERROR, dispatch);
	}
};

export const addRecipe = (recipe) => async (dispatch) => {
	try {
		dispatch({
			type: RECIPE_LOADING,
		});
		const res = await axios({
			method: "post",
			url: "/api/recipes",
			headers: {
				"Content-Type": "application/json",
			},
			data: recipe,
		});
		dispatch({
			type: ADD_RECIPE,
			payload: res.data.data, // send api data to include mongoose id
		});
	} catch (err) {
		handleError(err, RECIPE_ERROR, dispatch);
	}
};

export const updateRecipe = (recipe) => async (dispatch) => {
	try {
		dispatch({
			type: RECIPE_LOADING,
		});
		const res = await axios({
			method: "put",
			url: `/api/recipes/${recipe._id}`,
			headers: {
				"Content-Type": "application/json",
			},
			data: recipe,
		});
		dispatch({
			type: UPDATE_RECIPE,
			payload: res.data.data, // send api data to include mongoose id
		});
		dispatch(setCurrent(res.data.data)); // to reflect the update in the current opened recipe
	} catch (err) {
		handleError(err, RECIPE_ERROR, dispatch);
	}
};

export const deleteRecipe = (id) => async (dispatch) => {
	try {
		dispatch({
			type: RECIPE_LOADING,
		});
		await axios({
			method: "delete",
			url: `/api/recipes/${id}`,
		});
		dispatch({
			type: DELETE_RECIPE,
			payload: id,
		});
	} catch (err) {
		handleError(err, RECIPE_ERROR, dispatch);
	}
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

export const clearRecipesState = () => {
	return {
		type: CLEAR_RECIPES_STATE,
	};
};

// Register User
export const register = (formData) => async (dispatch) => {
	try {
		if (!navigator.onLine) {
			dispatch({
				type: AUTH_ERROR,
				payload: "Please check your internet connection",
			});
		} else {
			dispatch({
				type: AUTH_LOADING,
			});
			const res = await axios({
				method: "post",
				url: "/api/auth/register",
				headers: {
					"Content-Type": "application/json",
				},
				data: formData,
			});
			dispatch({
				type: AUTH_USER,
				payload: res.data.token,
			});
			localStorage.setItem("recipe-token", res.data.token);
			axios.setAuthToken(res.data.token);
		}
	} catch (err) {
		let message;
		if (err.response) {
			message = err.response.data.error;
			if (message.startsWith("Duplicate")) {
				message = "Email Aready In Use. Please Choose Another Email";
			}
		} else {
			message = "Something Went Wrong";
		}
		dispatch({
			type: AUTH_ERROR,
			payload: message,
		});
		setTimeout(() => {
			dispatch({
				type: AUTH_ERROR,
				payload: null,
			});
		}, 3000);
	}
};

// Login User
export const login = (formData) => async (dispatch) => {
	try {
		if (!navigator.onLine) {
			dispatch({
				type: AUTH_ERROR,
				payload: "Please check your internet connection",
			});
		} else {
			dispatch({
				type: AUTH_LOADING,
			});
			const res = await axios({
				method: "post",
				url: "/api/auth/login",
				headers: {
					"Content-Type": "application/json",
				},
				data: formData,
			});
			dispatch({
				type: AUTH_USER,
				payload: res.data.token,
			});
			localStorage.setItem("recipe-token", res.data.token);
			axios.setAuthToken(res.data.token);
		}
	} catch (err) {
		handleError(err, AUTH_ERROR, dispatch);
	}
};

export const logout = () => (dispatch) => {
	localStorage.removeItem("recipe-token");
	axios.setAuthToken("");
	dispatch({
		type: AUTH_USER,
		payload: "",
	});
	dispatch(clearRecipesState());
};

const handleError = (err, type, dispatch) => {
	let message;
	if (err.response) {
		message = err.response.data.error;
	} else {
		message = "Something Went Wrong";
	}
	dispatch({
		type,
		payload: message,
	});
	setTimeout(() => {
		dispatch({
			type,
			payload: null,
		});
	}, 3000);
};
