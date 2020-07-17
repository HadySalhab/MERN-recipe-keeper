import React, { useEffect, useRef } from "react";
import Recipes from "../recipes/Recipes";
import Recipe from "../recipes/Recipe";
import AddRecipeModal from "../recipes/AddRecipeModal";
import M from "materialize-css/dist/js/materialize.min.js";
const Home = () => {
	const fab = useRef();
	useEffect(() => {
		M.FloatingActionButton.init(fab.current);
	}, []);
	return (
		<div style={{ paddingTop: "2rem" }} className="row">
			<Recipes />
			<Recipe />

			<AddRecipeModal />
			<div ref={fab} className="fixed-action-btn">
				<a
					data-target="modal1"
					className="modal-trigger btn-floating btn-large green"
				>
					<i className="large material-icons">add</i>
				</a>
			</div>
		</div>
	);
};

export default Home;
