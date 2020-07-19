import React, { Fragment } from "react";
import "materialize-css/dist/css/materialize.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./auth/Register";
import Login from "./auth/Login";
import PrivateRoute from "../routing/PrivateRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
	return (
		<Router>
			<Fragment>
				<Navbar />
				<div className="container">
					<Switch>
						<PrivateRoute exact path="/" component={Home} />
						<Route exact path="/about" component={About} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
					</Switch>
				</div>
			</Fragment>
		</Router>
	);
};

export default App;
