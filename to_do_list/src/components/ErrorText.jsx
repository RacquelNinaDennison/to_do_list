import React from "react";

export const ErrorText = (props) => {
	function handleExitButton() {
		return props.exitButton();
	}
	return (
		<div className='card'>
			<div className='container'>
				<h1>
					<b>Error</b>
				</h1>
				<p>{props.error}</p>
				<button onClick={handleExitButton}>Exit</button>
			</div>
		</div>
	);
};