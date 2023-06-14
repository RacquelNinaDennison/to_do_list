import React, { useState } from "react";

const CreateArea = () => {
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
				<button>Add</button>
			</form>
		</div>
	);
};

export default CreateArea;
