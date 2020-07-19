import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				!authenticated ? <Redirect to="/login" /> : <Component {...props} />
			}
		/>
	);
};
const mapStateToProps = (state) => {
	return {
		authenticated: state.auth.authenticated,
	};
};
export default connect(mapStateToProps)(PrivateRoute);
