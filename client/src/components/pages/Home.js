import React, { useEffect, useRef, Fragment } from "react";
import Recipes from "../recipes/Recipes";
import Recipe from "../recipes/Recipe";
import RecipeModal from "../recipes/RecipeModal";
import M from "materialize-css/dist/js/materialize.min.js";
import Preloader from "../layout/Preloader";
import { loadUser } from "../../actions";
import { connect } from "react-redux";
const Home = ({ loadUser, isAuthenticated, loading, history }) => {
	const fab = useRef();

	useEffect(() => {
		const load = async () => {
			await loadUser();
			if (!isAuthenticated) {
				history.push("/register");
			}
		};
		load();
	}, []);

	useEffect(() => {
		M.FloatingActionButton.init(fab.current);
	}, []);

	return (
		<Fragment>
			{!isAuthenticated && (
				<div className="center-align" style={{ marginTop: ".75rem" }}>
					<Preloader />
				</div>
			)}
			{isAuthenticated && (
				<div style={{ paddingTop: "2rem" }} className="row">
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
			)}
		</Fragment>
	);
};
const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		loading: state.auth.loading,
	};
};
export default connect(mapStateToProps, { loadUser })(Home);
