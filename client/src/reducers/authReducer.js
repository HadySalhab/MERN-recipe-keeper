import { REGISTER_SUCCESS, REGISTER_FAIL, CLEAR_ALERT } from "../actions/types";

const initial = {
	token: localStorage.getItem("recipe-token"),
	isAuthenticated: null,
	loading: true,
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
		case CLEAR_ALERT:
			return {
				...state,
				alert: null,
			};
		default:
			return state;
	}
};
