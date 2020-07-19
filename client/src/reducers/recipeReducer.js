import {
	GET_RECIPES,
	ADD_RECIPE,
	UPDATE_RECIPE,
	DELETE_RECIPE,
	RECIPE_ERROR,
	SET_CURRENT,
	EDIT_RECIPE,
	CLEAR_EDIT_RECIPE,
} from "../actions/types";

const initialState = {
	recipes: [],
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
				recipes: [...state.recipes, action.payload],
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
				recipes: state.recipes.filter((rec) => rec.id !== action.payload),
				loading: false,
				current: null,
			};
		case RECIPE_ERROR:
			return {
				...state,
				loading: false,
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
		default:
			return state;
	}
};
