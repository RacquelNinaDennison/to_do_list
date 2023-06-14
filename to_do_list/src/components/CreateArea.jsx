import React, { useState } from "react";

const CreateArea = (props) => {
	const [note, setNote] = useState({ title: "", content: "" });
	function handleNoteMaking(e) {
		const { name, value } = e.target;
		setNote((prevValue) => {
			return {
				...prevValue,
				[name]: value,
			};
		});
	}
	function handleButtonSubmission(event) {
		props.updateNote(note);
		event.preventDefault();
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
					onChange={(e) => handleNoteMaking(e)}
				/>
				<button onClick={handleButtonSubmission}>Add</button>
			</form>
		</div>
	);
};

export default CreateArea;
