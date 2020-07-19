import {
	GET_RECIPES,
	ADD_RECIPE,
	UPDATE_RECIPE,
	DELETE_RECIPE,
	RECIPE_ERROR,
	SET_CURRENT,
	EDIT_RECIPE,
	CLEAR_EDIT_RECIPE,
	RECIPE_LOADING,
	CLEAR_RECIPES_STATE,
} from "../actions/types";

const initialState = {
	recipes: null,
	current: null,
	loading: null,
	error: null,
	edit: null,
};
export default (state = initialState, action) => {
	switch (action.type) {
		case GET_RECIPES:
			return {
				...state,
				recipes: action.payload,
				loading: false,
			};
		case ADD_RECIPE:
			return {
				...state,
				recipes: [action.payload, ...state.recipes],
				loading: false,
			};
		case UPDATE_RECIPE:
			return {
				...state,
				recipes: state.recipes.map((rec) =>
					rec.id === action.payload.id ? action.payload : rec
				),
				loading: false,
			};
		case DELETE_RECIPE:
			return {
				...state,
				recipes: state.recipes.filter((rec) => rec._id !== action.payload),
				loading: false,
				current: null,
			};
		case RECIPE_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case RECIPE_LOADING:
			return {
				...state,
				loading: true,
				error: null,
			};
		case SET_CURRENT: {
			return {
				...state,
				current: action.payload,
			};
		}
		case EDIT_RECIPE: {
			return {
				...state,
				edit: action.payload,
			};
		}
		case CLEAR_EDIT_RECIPE: {
			return {
				...state,
				edit: null,
			};
		}
		case CLEAR_RECIPES_STATE: {
			return {
				...state,
				recipes: null,
				current: null,
				loading: null,
				error: null,
				edit: null,
			};
		}
		default:
			return state;
	}
};
