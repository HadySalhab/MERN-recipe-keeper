import {
	GET_RECIPES,
	ADD_RECIPE,
	UPDATE_RECIPE,
	DELETE_RECIPE,
	RECIPE_ERROR,
} from "../actions/types";

initialState = {
	recipes: [
		{
			ingredients: [
				"4 (about 900g) Lilydale Free Range Chicken Thigh, skinned, excess fat trimmed",
				"1 large brown onion, halved, finely chopped",
			],
			_id: "5f1114faf03ef22108078545",
			name: "Chicken soup",
			direction:
				"Combine chicken, onion, carrot, celery, garlic, parsley, thyme, water and peppercorns in a large saucepan over medium-high heat. Bring to the boil. Reduce heat to low and cook, covered, for 40 minutes or until vegetables are very tender. Use tongs to transfer the chicken to a clean work surface. Hold with tongs and cut the chicken meat from the bones. Discard bones. Tear the chicken meat and add to the soup.Taste and season with sea salt. Ladle soup among serving bowls. Sprinkle with extra parsley and serve immediately.",
		},
		{
			ingredients: [
				"4 (about 900g) Lilydale Free Range Chicken Thigh, skinned, excess fat trimmed",
				"1 large brown onion, halved, finely chopped",
			],
			_id: "5f1114faf03ef22108078545",
			name: "Chicken soup",
			direction:
				"Combine chicken, onion, carrot, celery, garlic, parsley, thyme, water and peppercorns in a large saucepan over medium-high heat. Bring to the boil. Reduce heat to low and cook, covered, for 40 minutes or until vegetables are very tender. Use tongs to transfer the chicken to a clean work surface. Hold with tongs and cut the chicken meat from the bones. Discard bones. Tear the chicken meat and add to the soup.Taste and season with sea salt. Ladle soup among serving bowls. Sprinkle with extra parsley and serve immediately.",
		},
		{
			ingredients: [
				"4 (about 900g) Lilydale Free Range Chicken Thigh, skinned, excess fat trimmed",
				"1 large brown onion, halved, finely chopped",
			],
			_id: "5f1114faf03ef22108078545",
			name: "Chicken soup",
			direction:
				"Combine chicken, onion, carrot, celery, garlic, parsley, thyme, water and peppercorns in a large saucepan over medium-high heat. Bring to the boil. Reduce heat to low and cook, covered, for 40 minutes or until vegetables are very tender. Use tongs to transfer the chicken to a clean work surface. Hold with tongs and cut the chicken meat from the bones. Discard bones. Tear the chicken meat and add to the soup.Taste and season with sea salt. Ladle soup among serving bowls. Sprinkle with extra parsley and serve immediately.",
		},
	],
	current: null,
	loading: null,
	error: null,
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
				recipes: [...state, recipes, action.payload],
				loading: false,
			};
		case UPDATE_RECIPE:
			return {
				...state,
				recipes: state.recipes.map((rec) =>
					rec._id === action.payload._id ? action.payload : rec
				),
				loading: false,
			};
		case DELETE_RECIPE:
			return {
				...state,
				recipes: state.recipes.filter((rec) => rec._id !== action.payload),
				loading: false,
			};
		case RECIPE_ERROR:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
};
