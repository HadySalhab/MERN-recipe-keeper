import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import "../../App.css";
const Navbar = (props) => {
	const { title, icon } = props;
	const sideNav = useRef();
	useEffect(() => {
		M.Sidenav.init(sideNav.current);
	}, []);
	return (
		<React.Fragment>
			<nav className="green">
				<div className="nav-wrapper container">
					<a href="#!" className="brand-logo">
						<i className={`nav-icon ${icon}`}></i>
						{title}
					</a>
					<a href="#" data-target="mobile-demo" className="sidenav-trigger">
						<i className="material-icons">menu</i>
					</a>
					<ul className="right hide-on-med-and-down">
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/about">About</Link>
						</li>
						<li>
							<Link to="/register">Register</Link>
						</li>
						<li>
							<Link to="/login">Login</Link>
						</li>
					</ul>
				</div>
			</nav>
			<ul className="sidenav" id="mobile-demo" ref={sideNav}>
				<li>
					<Link className="sidenav-close" to="/">
						Home
					</Link>
				</li>
				<li>
					<Link className="sidenav-close" to="/about">
						About
					</Link>
				</li>
				<li>
					<Link className="sidenav-close" to="/register">
						Register
					</Link>
				</li>
				<li>
					<Link className="sidenav-close" to="/login">
						Login
					</Link>
				</li>
			</ul>
		</React.Fragment>
	);
};
Navbar.prototype = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string,
};

Navbar.defaultProps = {
	title: "Recipe Keeper",
	icon: "fas fa-utensils",
};

export default Navbar;
