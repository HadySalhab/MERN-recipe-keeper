import React from "react";
import Recipes from "../recipes/Recipes";

const Home = () => {
	return (
		<div style={{ paddingTop: "2rem" }} className="row">
			<Recipes />
		</div>
	);
};

export default Home;
