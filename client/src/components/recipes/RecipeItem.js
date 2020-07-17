import React from "react";

const RecipeItem = ({ recipe }) => {
	return (
		<li className="collection-item">
			<div style={{ fontSize: "1.3rem" }}>
				{recipe.name}
				<a href="#!" className="secondary-content">
					<i className="material-icons">send</i>
				</a>
			</div>
		</li>
	);
};

export default RecipeItem;
