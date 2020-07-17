import { useState } from "react";

const useIngredients = (initialValue) => {
	const [ingredients, setIngredients] = useState(initialValue);
	const addIngredient = (ingredient) => {
		setIngredients([...ingredients, ingredient]);
	};
	const deleteIngredient = (ing) => {
		setIngredients(ingredients.filter((el) => el !== ing));
	};
	const clearIngredients = () => {
		setIngredients([]);
	};
	return { ingredients, addIngredient, deleteIngredient, clearIngredients };
};

export default useIngredients;
