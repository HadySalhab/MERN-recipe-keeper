import React, { useEffect, useRef } from "react";
import Recipes from "../recipes/Recipes";
import Recipe from "../recipes/Recipe";
import RecipeModal from "../recipes/RecipeModal";
import M from "materialize-css/dist/js/materialize.min.js";
import Alert from "../layout/Alert";
import Preloader from "../layout/Preloader";
import { connect } from "react-redux";

const Home = ({ error, loading }) => {
	const fab = useRef();

	useEffect(() => {
		M.FloatingActionButton.init(fab.current);
	}, []);

	return (
		<div style={{ paddingTop: "2rem" }} className="row">
			{error && <Alert error={error} />}
			{loading && (
				<div
					style={{ padding: ".75rem 0rem", marginBottom: "0.75rem" }}
					className="center-align"
				>
					<Preloader />
				</div>
			)}
			<Recipes />
			<Recipe />
			<RecipeModal />
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
const mapStateToProps = (state) => {
	return {
		error: state.recipes.error,
		loading: state.recipes.loading,
	};
};
export default connect(mapStateToProps)(Home);
