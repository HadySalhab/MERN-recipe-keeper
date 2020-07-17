import React from "react";
import Recipes from "../recipes/Recipes";
import Recipe from "../recipes/Recipe";

const Home = () => {
	return (
		<div style={{ paddingTop: "2rem" }} className="row">
			<Recipes />
			<Recipe />
		</div>
	);
};

export default Home;
