import React from "react";
import { connect } from "react-redux";
import { setCurrent } from "../../actions";

const RecipeItem = ({ recipe, setCurrent }) => {
	return (
		<li className="collection-item">
			<div style={{ fontSize: "1.3rem" }}>
				{recipe.name}
				<a
					href="#!"
					className="secondary-content"
					onClick={(e) => {
						e.preventDefault();
						setCurrent(recipe);
					}}
				>
					<i className="material-icons green-text">send</i>
				</a>
			</div>
		</li>
	);
};

export default connect(null, { setCurrent })(RecipeItem);
