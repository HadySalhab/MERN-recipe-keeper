import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getRecipes } from "../../actions";
import RecipeItem from "./RecipeItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Recipes = ({ recipes, getRecipes }) => {
	useEffect(() => {
		getRecipes();
		// eslint-disable-next-line
	}, []);

	if (recipes && recipes.length === 0) {
		return (
			<div className="center-align green-text">
				<h4>Please Add Some Recipes</h4>
			</div>
		);
	}
	return (
		<Fragment>
			{recipes && (
				<TransitionGroup className="collection col s12 m6">
					{recipes.map((rec) => (
						<CSSTransition key={rec._id} timeout={500} classNames="item">
							<RecipeItem recipe={rec} />
						</CSSTransition>
					))}
				</TransitionGroup>
			)}
		</Fragment>
	);
};
const mapStateToProps = (state) => {
	return {
		recipes: state.recipes.recipes,
	};
};
export default connect(mapStateToProps, { getRecipes })(Recipes);
