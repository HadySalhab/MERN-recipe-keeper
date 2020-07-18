import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	CLEAR_ALERT,
	REGISTER_LOADING,
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
			return {
				...state,
				token: action.payload,
				isAuthenticated: true,
				loading: false,
			};
		case REGISTER_FAIL:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				alert: action.payload,
			};
		case REGISTER_LOADING:
			return {
				...state,
				loading: true,
				alert: null,
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
