import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

const CreateArea = (props) => {
	const [note, setNote] = useState({ title: "", content: "" });
	const [takingNote, setTakingNote] = useState(false);

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
			<form className='create-note'>
				<input
					name='title'
					placeholder={takingNote ? "Title" : "Start Taking notes"}
					value={note.title}
					onChange={handleNoteMaking}
					onClick={() => {
						setTakingNote(true);
					}}
				/>
				{takingNote && (
					<textarea
						name='content'
						placeholder='Take a note...'
						rows={takingNote ? "3" : "1"}
						value={note.content}
						onChange={handleNoteMaking}
					/>
				)}

				<Zoom in={takingNote}>
					<Fab onClick={handleButtonSubmission}>
						<AddCircleOutlineIcon />
					</Fab>
				</Zoom>
			</form>
		</div>
	);
};

export default CreateArea;
