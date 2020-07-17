import React from "react";
import { connect } from "react-redux";
import RecipeItem from "./RecipeItem";

const Recipes = (props) => {
	const { recipes, loading } = props.recipes;
	return (
		<div className="collection col s12 m6">
			{recipes.map((rec) => (
				<RecipeItem recipe={rec} key={rec._id} />
			))}
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		recipes: state.recipes,
	};
};
export default connect(mapStateToProps)(Recipes);
