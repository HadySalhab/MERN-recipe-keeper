import React, { useRef, useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import useForm from "../../hooks/useForm";
import useIngredients from "../../hooks/useIngredients";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { addRecipe } from "../../actions";
const AddRecipeModal = (props) => {
	const [name, onNameChange, resetName] = useForm("");
	const [direction, onDirectionChange, resetDirection] = useForm("");
	const [ingredient, onIngredientChange, resetIngredient] = useForm("");
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
				clearInputs();
			},
		});
	}, []);
	const clearInputs = () => {
		resetName();
		resetDirection();
		resetIngredient();
		clearIngredients();
	};

	const handleSubmit = () => {
		M.Modal.getInstance(modal.current).close();
		const recipe = {
			id: uuidv4(),
			name,
			direction,
			ingredients,
		};
		props.addRecipe(recipe);
		clearInputs();
	};

	return (
		<div id="modal1" className=".no-autoinit modal" ref={modal}>
			<div className="modal-content">
				<h4 className="green-text">Enter Recipe Detail</h4>

				<div className="row">
					<form className="col s12">
						<div className="input-field">
							<input
								id="name"
								type="text"
								className="validate"
								name="name"
								value={name}
								onChange={onNameChange}
							/>
							<label htmlFor="name">Name</label>
						</div>
						<div className="input-field">
							<textarea
								id="direction"
								className="materialize-textarea"
								name="direction"
								value={direction}
								onChange={onDirectionChange}
							></textarea>
							<label htmlFor="direction">Direction</label>
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
									/>
									<label htmlFor="ingredient">Ingredient</label>
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
					</form>
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
				</div>
				<div className="right-align">
					<button
						onClick={handleSubmit}
						className="waves-effect waves-light btn green white-text"
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default connect(null, { addRecipe })(AddRecipeModal);
