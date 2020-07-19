import React, { useEffect } from "react";
import useFormState from "../../hooks/useForm";
import { connect } from "react-redux";
import { register as registerUser } from "../../actions";
import { useForm } from "react-hook-form";
import Alert from "../layout/Alert";
import Preloader from "../layout/Preloader";
const Register = ({ registerUser, error, loading, authenticated, history }) => {
	const [name, onNameChange] = useFormState("");
	const [email, onEmailChange] = useFormState("");
	const [password, onPasswordChange] = useFormState("");
	const [confirmPassword, onConfirmPasswordChange] = useFormState("");
	const { trigger, register, errors } = useForm();

	useEffect(() => {
		if (authenticated) {
			history.push("/");
		}
	}, [authenticated, history]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await trigger();
		if (result) {
			registerUser({
				name,
				email,
				password,
			});
		}
	};

	return (
		<div className="row section">
			{error && <Alert error={error} />}
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
							<span className="green-text">Registration </span>Form
						</h4>
						<form onSubmit={handleSubmit}>
							<div className="input-field">
								<i className="material-icons prefix green-text">
									account_circle
								</i>
								<input
									ref={register({
										required: true,
									})}
									value={name}
									id="name"
									name="name"
									type="text"
									onChange={onNameChange}
									className="validate"
								/>
								<label htmlFor="name">Name</label>
								{errors.name?.type === "required" && (
									<span className="left-align helper-text red-text">
										Please add a name
									</span>
								)}
							</div>
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
										validate: () => {
											return password === confirmPassword;
										},
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
							<div className="input-field">
								<i className="material-icons prefix green-text">lock</i>
								<input
									value={confirmPassword}
									id="confirmPassword"
									name="confirmPassword"
									type="password"
									onChange={onConfirmPasswordChange}
									className="validate"
									ref={register({
										required: true,
										validate: () => {
											return password === confirmPassword;
										},
									})}
								/>
								<label htmlFor="confirmPassword">Confirm Password</label>
								{errors.confirmPassword?.type === "required" && (
									<span className="left-align helper-text red-text">
										Please add confirm password
									</span>
								)}
								{errors.confirmPassword?.type === "validate" && (
									<span className="left-align helper-text red-text">
										Passwords don't match
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
		error: state.auth.errorMessage,
		loading: state.auth.loading,
		authenticated: state.auth.authenticated,
	};
};

export default connect(mapStateToProps, { registerUser })(Register);
