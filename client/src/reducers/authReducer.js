const initial = {
	token: localStorage.getItem("recipe-token"),
	isAuthenticated: null,
	loading: true,
	alert: null,
	user: null,
};

export default (state = initial, action) => {
	switch (action.type) {
		default:
			return state;
	}
};
