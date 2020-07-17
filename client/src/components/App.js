import React, { Fragment } from "react";
import "materialize-css/dist/css/materialize.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
	return (
		<Router>
			<Fragment>
				<Navbar />
				<div className="container">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/about" component={About} />
					</Switch>
				</div>
			</Fragment>
		</Router>
	);
};

export default App;
