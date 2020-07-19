import React, { useEffect, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import { logout } from "../../actions";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import "../../App.css";
import { connect } from "react-redux";
const Navbar = (props) => {
	const { title, icon, authenticated, logout } = props;

	const sideNav = useRef();
	useEffect(() => {
		M.Sidenav.init(sideNav.current);
	}, []);

	const authLinks = (
		<li>
			<a
				className="sidenav-close pointer"
				onClick={(e) => {
					e.preventDefault();
					logout();
				}}
			>
				Logout
			</a>
		</li>
	);
	const guestLinks = (
		<Fragment>
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
		</Fragment>
	);
	return (
		<React.Fragment>
			<nav className="green">
				<div className="nav-wrapper container">
					<a className="brand-logo">
						<i className={`nav-icon ${icon}`}></i>
						{title}
					</a>
					<a href="#" data-target="mobile-demo" className="sidenav-trigger">
						<i className="material-icons">menu</i>
					</a>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						{authenticated ? authLinks : guestLinks}
					</ul>
				</div>
			</nav>
			{/* mobile */}
			<ul className="sidenav" id="mobile-demo" ref={sideNav}>
				{authenticated ? authLinks : guestLinks}
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
const mapStateToProps = (state) => {
	return {
		authenticated: state.auth.authenticated,
	};
};

export default connect(mapStateToProps, { logout })(Navbar);
