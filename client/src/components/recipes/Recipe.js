import React, { Fragment } from "react";
import { connect } from "react-redux";
import { deleteRecipe, editRecipe } from "../../actions";

const Recipe = ({ recipe, deleteRecipe, editRecipe }) => {
	if (!recipe) {
		return <Fragment></Fragment>;
	}
	return (
		<div style={{ padding: "0" }} className="col s12 ">
			<ul className="collection with-header">
				<li className="collection-header">
					<h4 className="green-text">
						{recipe.name}

						<a
							href="#!"
							className="secondary-content"
							onClick={(e) => {
								e.preventDefault();
								deleteRecipe(recipe.id);
							}}
						>
							<i className="material-icons red-text">delete</i>
						</a>
						<a
							href="#!"
							className="secondary-content"
							onClick={(e) => {
								e.preventDefault();
								editRecipe(recipe);
							}}
						>
							<i className="material-icons blue-text">create</i>
						</a>
					</h4>
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
export default connect(mapStateToProps, { deleteRecipe, editRecipe })(Recipe);
