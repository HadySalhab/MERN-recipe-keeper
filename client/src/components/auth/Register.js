import React, { useState } from "react";
import useFormState from "../../hooks/useForm";
const Register = () => {
	const [name, onNameChange] = useFormState("");
	const [email, onEmailChange] = useFormState("");
	const [password, onPasswordChange] = useFormState("");
	const [password2, onPassword2Change] = useFormState("");

	return (
		<div className="row section">
			<div className="col s12 m8 xl6 offset-m2 offset-xl3">
				<div className="center-align card">
					<div className="card-content">
						<h4>
							<span className="green-text">Register </span>Form
						</h4>
						<form>
							<div className="input-field">
								<i className="material-icons prefix green-text">
									account_circle
								</i>
								<input
									value={name}
									id="name"
									name="name"
									type="text"
									className="validate"
								/>
								<label htmlFor="name">Name</label>
							</div>
							<div className="input-field">
								<i className="material-icons prefix green-text">email</i>
								<input
									value={email}
									id="email"
									name="email"
									type="email"
									className="validate"
								/>
								<label htmlFor="name">Email</label>
							</div>
							<div className="input-field">
								<i className="material-icons prefix green-text">lock</i>
								<input
									value={password}
									id="password"
									name="password"
									type="password"
									className="validate"
								/>
								<label htmlFor="name">Password</label>
							</div>
							<div className="input-field">
								<i className="material-icons prefix green-text">lock</i>
								<input
									value={password2}
									id="password2"
									name="password2"
									type="password"
									className="validate"
								/>
								<label htmlFor="name">Password</label>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
