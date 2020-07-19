import React from "react";

const Alert = ({ error }) => {
	return (
		<div
			style={{ padding: ".75rem 0rem", marginBottom: "0.75rem" }}
			className="red white-text center-align"
		>
			{error}
		</div>
	);
};

export default Alert;
