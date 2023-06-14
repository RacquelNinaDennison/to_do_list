import React, { useState } from "react";

const CreateArea = (props) => {
	const [note, setNote] = useState({ title: "", content: "" });

	function handleNoteMaking(event) {
		const { name, value } = event.target;
		setNote((prevValue) => {
			return {
				...prevValue,
				[name]: value,
			};
		});
	}
	function handleButtonSubmission(event) {
		event.preventDefault();
		props.updateNote(note);
		setNote({ title: "", content: "" });
	}
	return (
		<div>
			<form>
				<input
					name='title'
					placeholder='Title'
					value={note.title}
					onChange={handleNoteMaking}
				/>
				<textarea
					name='content'
					placeholder='Take a note...'
					rows='3'
					value={note.content}
					onChange={handleNoteMaking}
				/>
				<button onClick={handleButtonSubmission}>Add</button>
			</form>
		</div>
	);
};

export default CreateArea;
