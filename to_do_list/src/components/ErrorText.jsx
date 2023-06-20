import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export const ErrorText = (props) => {
	useEffect(() => {
		const toastId = toast("Fields cannot be blank");

		return () => {
			toast.dismiss(toastId); // Remove the toast when component unmounts
		};
	}, []);

	function handleExitButton() {
		return props.exitButton();
	}

	return (
		<div className='card'>
			<Toaster />
			<button onClick={handleExitButton}>Go back</button>
		</div>
	);
};
