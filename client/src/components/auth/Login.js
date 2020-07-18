import React, { useState, useEffect } from "react";
import useFormState from "../../hooks/useForm";
import { connect } from "react-redux";
import { login } from "../../actions";
import { useForm } from "react-hook-form";
import Preloader from "../layout/Preloader";
const Login = ({ login, alert, loading, isAuthenticated, history }) => {
	const [email, onEmailChange] = useFormState("");
	const [password, onPasswordChange] = useFormState("");

	const { clearErrors, trigger, register, errors } = useForm();

	useEffect(() => {
		if (isAuthenticated) {
			history.push("/");
		}
	}, [isAuthenticated]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await trigger();
		if (result) {
			login({
				email,
				password,
			});
		}
	};

	return (
		<div className="row section">
			{alert && (
				<div
					style={{ padding: ".75rem 0rem", marginBottom: "0.75rem" }}
					className="red white-text center-align"
				>
					{alert}
				</div>
			)}
			{loading && (
				<div
					style={{ padding: ".75rem 0rem", marginBottom: "0.75rem" }}
					className="center-align"
				>
					<Preloader />
				</div>
			)}

			<div className="col s12 m8 xl6 offset-m2 offset-xl3">
				<div className="center-align card">
					<div className="card-content">
						<h4>
							<span className="green-text">Account </span>Login
						</h4>
						<form onSubmit={handleSubmit}>
							<div className="input-field">
								<i className="material-icons prefix green-text">email</i>
								<input
									value={email}
									id="email"
									name="email"
									type="text"
									onChange={onEmailChange}
									ref={register({
										required: true,
										validate: () => {
											const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
											return re.test(String(email).toLowerCase());
										},
									})}
								/>
								<label htmlFor="email">Email</label>
								{errors.email?.type === "required" && (
									<span className="left-align helper-text red-text">
										Please add an email
									</span>
								)}
								{errors.email?.type === "validate" && (
									<span className="left-align helper-text red-text">
										Please add a valid email
									</span>
								)}
							</div>
							<div className="input-field">
								<i className="material-icons prefix green-text">lock</i>
								<input
									value={password}
									id="password"
									name="password"
									type="password"
									onChange={onPasswordChange}
									className="validate"
									ref={register({
										required: true,
										minLength: 6,
									})}
								/>
								<label htmlFor="password">Password</label>
								{errors.password?.type === "required" && (
									<span className="left-align helper-text red-text">
										Please add a password
									</span>
								)}
								{errors.password?.type === "minLength" && (
									<span className="left-align helper-text red-text">
										Password should contains at least 6 characters
									</span>
								)}
							</div>
							<button
								style={{ width: "100%" }}
								type="submit"
								className="waves-effect waves-light btn green white-text "
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		alert: state.auth.alert,
		loading: state.auth.loading,
		isAuthenticated: state.auth.isAuthenticated,
	};
};

export default connect(mapStateToProps, { login })(Login);
