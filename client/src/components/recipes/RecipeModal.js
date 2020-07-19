import React, { useRef, useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import useFormState from "../../hooks/useForm";
import { useForm } from "react-hook-form";
import useIngredients from "../../hooks/useIngredients";
import { connect } from "react-redux";
import { addRecipe, clearEditRecipe, updateRecipe } from "../../actions";

const RecipeModal = ({ recipe, addRecipe, clearEditRecipe, updateRecipe }) => {
	const [name, onNameChange, resetName, setName] = useFormState("");
	const [
		direction,
		onDirectionChange,
		resetDirection,
		setDirection,
	] = useFormState("");
	const [ingredient, onIngredientChange, resetIngredient] = useFormState("");
	const { clearErrors, trigger, register, errors } = useForm();
	const {
		ingredients,
		addIngredient,
		deleteIngredient,
		clearIngredients,
		setIngredients,
	} = useIngredients([]);

	const modal = useRef();
	const textArea = useRef();

	useEffect(() => {
		M.Modal.init(modal.current, {
			onCloseEnd: () => {
				clearState();
			},
		});
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		// edit recipe
		if (recipe) {
			M.Modal.getInstance(modal.current).open();
			setName(recipe.name);
			setDirection(recipe.direction);
			setIngredients(recipe.ingredients);
		}
		// eslint-disable-next-line
	}, [recipe]);

	useEffect(() => {
		if (textArea.current) {
			M.textareaAutoResize(textArea.current);
		}
	});

	const clearState = () => {
		resetName();
		resetDirection();
		resetIngredient();
		clearIngredients();
		clearErrors();
		clearEditRecipe();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await trigger();
		if (result) {
			M.Modal.getInstance(modal.current).close();
			if (recipe) {
				updateRecipe({
					_id: recipe._id,
					name,
					direction,
					ingredients,
				});
			} else {
				addRecipe({
					name,
					direction,
					ingredients,
				});
				clearState();
			}
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
							{!recipe && <label htmlFor="name">Name</label>}
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
								ref={(el) => {
									textArea.current = el;
									register({
										required: true,
										minLength: 50,
									});
								}}
							></textarea>
							{!recipe && <label htmlFor="direction">Directions</label>}
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
const mapStateToProps = (state) => {
	return {
		recipe: state.recipes.edit,
	};
};

export default connect(mapStateToProps, {
	addRecipe,
	clearEditRecipe,
	updateRecipe,
})(RecipeModal);
