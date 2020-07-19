import React from "react";
import { connect } from "react-redux";
import RecipeItem from "./RecipeItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Recipes = (props) => {
	const { recipes, loading } = props.recipes;
	if (recipes.length === 0) {
		return (
			<div className="center-align green-text">
				<h4>Please Add Some Recipes</h4>
			</div>
		);
	}
	return (
		<TransitionGroup className="collection col s12 m6">
			{recipes.map((rec) => (
				<CSSTransition key={rec.id} timeout={500} classNames="item">
					<RecipeItem recipe={rec} />
				</CSSTransition>
			))}
		</TransitionGroup>
	);
};
const mapStateToProps = (state) => {
	return {
		recipes: state.recipes,
	};
};
export default connect(mapStateToProps)(Recipes);
