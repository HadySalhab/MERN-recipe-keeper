import { AUTH_USER, AUTH_LOADING, AUTH_ERROR } from "../actions/types";

const initial = {
	authenticated: "",
	errorMessage: null,
	loading: false,
};

export default (state = initial, action) => {
	switch (action.type) {
		case AUTH_USER:
			return {
				...state,
				authenticated: action.payload,
				loading: false,
				errorMessage: null,
			};
		case AUTH_ERROR:
			return {
				...state,
				loading: false,
				errorMessage: action.payload,
			};
		case AUTH_LOADING:
			return {
				...state,
				loading: true,
				errorMessage: null,
			};
		default:
			return state;
	}
};
