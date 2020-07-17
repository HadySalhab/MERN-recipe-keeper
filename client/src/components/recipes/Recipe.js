import React, { Fragment } from "react";
import { connect } from "react-redux";

const Recipe = ({ recipe }) => {
	if (!recipe) {
		return <Fragment></Fragment>;
	}
	return (
		<div style={{ padding: "0" }} className="col s12 ">
			<ul className="collection with-header">
				<li className="collection-header">
					<h4 className="green-text">{recipe.name}</h4>
				</li>
				<li className="collection-item">
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
