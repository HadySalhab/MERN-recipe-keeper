import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import reducers from "./reducers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import axios from "./util/axios";

if (localStorage.getItem("recipe-token")) {
	axios.setAuthToken(localStorage.getItem("recipe-token"));
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	reducers,
	{
		auth: { authenticated: localStorage.getItem("recipe-token") },
	},
	composeEnhancers(applyMiddleware(reduxThunk))
);
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
