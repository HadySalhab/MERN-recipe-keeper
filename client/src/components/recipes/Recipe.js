import React, { Fragment } from "react";
import { connect } from "react-redux";

const Recipe = ({ recipe }) => {
	if (!recipe) {
		return <Fragment></Fragment>;
	}
	return (
		<div className="col s12 m6 ">
			<ul class="collection with-header">
				<li class="collection-header">
					<h4>{recipe.name}</h4>
				</li>
				<li class="collection-item">
					<p>{recipe.direction}</p>
				</li>
			</ul>
			<ul className="collection">
				{recipe.ingredients.map((ingredient, index) => {
					return (
						<li className="collection-item" key={ingredient}>
							{ingredient}
						</li>
					);
				})}
			</ul>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		recipe: state.recipes.current,
	};
};
export default connect(mapStateToProps)(Recipe);
