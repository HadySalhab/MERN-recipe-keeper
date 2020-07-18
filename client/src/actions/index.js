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
	AUTH_LOADING,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
} from "./types";
import axios from "../util/axios";

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

// Register User
export const register = (formData) => async (dispatch) => {
	try {
		if (!navigator.onLine) {
			dispatch({
				type: REGISTER_FAIL,
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
				type: REGISTER_SUCCESS,
				payload: res.data.token,
			});
			localStorage.setItem("recipe-token", res.data.token);
		}
		dispatch(loadUser());
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
				payload: "Something went wrong.",
			});
		}
		setTimeout(() => {
			dispatch(clearAlert());
		}, 3000);
		localStorage.removeItem("recipe-token");
	}
};

// Login User
export const login = (formData) => async (dispatch) => {
	try {
		if (!navigator.onLine) {
			dispatch({
				type: LOGIN_FAIL,
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
				type: LOGIN_SUCCESS,
				payload: res.data.token,
			});
			localStorage.setItem("recipe-token", res.data.token);
			dispatch(loadUser());
		}
	} catch (err) {
		if (err.response) {
			let message = err.response.data.error;
			dispatch({
				type: LOGIN_FAIL,
				payload: message,
			});
		} else {
			dispatch({
				type: LOGIN_FAIL,
				payload: "Something went wrong.",
			});
		}
		setTimeout(() => {
			dispatch(clearAlert());
		}, 3000);
		localStorage.removeItem("recipe-token");
	}
};

// load user
export const loadUser = () => async (dispatch) => {
	if (localStorage.getItem("recipe-token")) {
		axios.setAuthToken(localStorage.getItem("recipe-token"));
	}
	try {
		const res = await axios({
			method: "get",
			url: "/api/auth/me",
		});
		dispatch({
			type: USER_LOADED,
			payload: res.data.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
			payload: null,
		});
		localStorage.removeItem("recipe-token");
	}
};
export const logout = () => {
	localStorage.removeItem("recipe-token");
	return {
		type: LOGOUT,
		payload: null,
	};
};
export const clearAlert = () => {
	return {
		type: CLEAR_ALERT,
	};
};
