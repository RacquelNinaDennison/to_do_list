import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import { ErrorText } from "./ErrorText";

const CreateArea = (props) => {
	const [note, setNote] = useState({ title: "", content: "" });
	const [takingNote, setTakingNote] = useState(false);
	const [emptyField, setEmptyField] = useState(false);

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
		// Check if either the title or content is empty
		if (note.title.trim() !== "" || note.content.trim() !== "") {
			props.updateNote(note);
			setNote({ title: "", content: "" });
		} else {
			setEmptyField(true);
		}
	}
	function exitButton() {
		console.log("exit burron ");
		setEmptyField(false);
	}
	return !emptyField ? (
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
	) : (
		<div>
			<ErrorText
				error={"Empty title or empty content field is not allowed."}
				exitButton={exitButton}
			/>
		</div>
	);
};

export default CreateArea;
