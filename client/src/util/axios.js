import axios from "axios";

axios.setAuthToken = function (token) {
	if (token) {
		this.defaults.headers.common = { Authorization: `Bearer ${token}` };
	} else {
		delete this.defaults.headers.common["Authorization"];
	}
};

export default axios;
