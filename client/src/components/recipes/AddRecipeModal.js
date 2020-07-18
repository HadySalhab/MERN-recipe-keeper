import React, { useRef, useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import useFormState from "../../hooks/useForm";
import { useForm } from "react-hook-form";
import useIngredients from "../../hooks/useIngredients";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { addRecipe } from "../../actions";

const AddRecipeModal = (props) => {
	const [name, onNameChange, resetName] = useFormState("");
	const [direction, onDirectionChange, resetDirection] = useFormState("");
	const [ingredient, onIngredientChange, resetIngredient] = useFormState("");
	const { clearErrors, trigger, register, errors } = useForm();
	const {
		ingredients,
		addIngredient,
		deleteIngredient,
		clearIngredients,
	} = useIngredients([]);

	const modal = useRef();

	useEffect(() => {
		M.Modal.init(modal.current, {
			onCloseEnd: () => {
				clearState();
			},
		});
	}, []);

	const clearState = () => {
		resetName();
		resetDirection();
		resetIngredient();
		clearIngredients();
		clearErrors();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await trigger();
		if (result) {
			M.Modal.getInstance(modal.current).close();
			const recipe = {
				id: uuidv4(),
				name,
				direction,
				ingredients,
			};
			props.addRecipe(recipe);
			clearState();
		}
	};

	return (
		<div id="modal1" className=".no-autoinit modal" ref={modal}>
			<div className="modal-content">
				<h4 className="green-text">Enter Recipe Detail</h4>

				<div className="row">
					<form className="col s12" onSubmit={handleSubmit}>
						<div className="input-field">
							<input
								id="name"
								type="text"
								className="validate"
								name="name"
								value={name}
								onChange={onNameChange}
								ref={register({
									required: true,
								})}
							/>
							<label htmlFor="name">Name</label>
							{errors.name?.type === "required" && (
								<span className="helper-text red-text">Please add a name</span>
							)}
						</div>
						<div className="input-field">
							<textarea
								id="direction"
								className="materialize-textarea"
								name="direction"
								value={direction}
								onChange={onDirectionChange}
								ref={register({
									required: true,
									minLength: 50,
								})}
							></textarea>
							<label htmlFor="direction">Directions</label>
							{errors.direction?.type === "required" && (
								<span className="helper-text red-text">
									Please add directions
								</span>
							)}
							{errors.direction?.type === "minLength" && (
								<span className="helper-text red-text">
									Direction should be at least 50 characters
								</span>
							)}
						</div>

						<div className="row">
							<div className="col s12 ingredients-input">
								<div className="input-field">
									<input
										id="ingredient"
										type="text"
										className="validate"
										name="ingredient"
										value={ingredient}
										onChange={onIngredientChange}
										ref={register({
											validate: () => {
												return ingredients.length > 0;
											},
										})}
									/>
									<label htmlFor="ingredient">Ingredient</label>
									{errors.ingredient?.type === "validate" && (
										<span className="helper-text red-text">
											Please add at least 1 ingredient
										</span>
									)}
								</div>
								<a
									href="#!"
									className="secondary-content green-text"
									onClick={(e) => {
										e.preventDefault();
										addIngredient(ingredient);
										resetIngredient();
									}}
								>
									<i className="material-icons">add</i>
								</a>
							</div>
						</div>

						{ingredients.length > 0 && (
							<ul className="collection">
								{ingredients.map((ing) => (
									<li key={ing} className="collection-item">
										<div>
											{ing}
											<a
												href="#!"
												className="secondary-content"
												onClick={(e) => {
													e.preventDefault();
													deleteIngredient(ing);
												}}
											>
												<i className="material-icons green-text">delete</i>
											</a>
										</div>
									</li>
								))}
							</ul>
						)}
						<div className="right-align">
							<button
								type="submit"
								className="waves-effect waves-light btn green white-text"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default connect(null, { addRecipe })(AddRecipeModal);
