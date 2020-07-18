import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	CLEAR_ALERT,
	AUTH_LOADING,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
} from "../actions/types";

const initial = {
	token: localStorage.getItem("recipe-token"),
	isAuthenticated: null,
	loading: false,
	alert: null,
	user: null,
};

export default (state = initial, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			return {
				...state,
				token: action.payload,
				isAuthenticated: true,
				loading: false,
			};
		case REGISTER_FAIL:
		case LOGIN_FAIL:
		case AUTH_ERROR:
		case LOGOUT:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				alert: action.payload,
			};
		case AUTH_LOADING:
			return {
				...state,
				loading: true,
				alert: null,
			};
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				alert: null,
				user: action.payload,
			};
		case CLEAR_ALERT:
			return {
				...state,
				alert: null,
				loading: false,
			};
		default:
			return state;
	}
};
