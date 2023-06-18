import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

const Note = (props) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(props.title);
	const [editedContent, setEditedContent] = useState(props.content);

	function handleDelete() {
		props.deleteItem(props.id);
	}

	function handleEdit() {
		setIsEditing(true);
	}

	function handleSave() {
		// Perform the necessary actions to save the edited note
		// For example, you can pass the editedTitle and editedContent to a function in the parent component to update the notes array.

		// After saving, exit the edit mode
		setIsEditing(false);
	}

	function handleCancel() {
		// Revert the changes made during editing
		setEditedTitle((prevState) => {
			return prevState;
		});
		setEditedContent((prevState) => {
			return prevState;
		});

		// Exit the edit mode
		setIsEditing(false);
	}

	return (
		<div className='note'>
			{isEditing ? (
				<>
					<input
						type='text'
						value={editedTitle}
						onChange={(e) => {
							console.log(e.target.value);
							setEditedTitle(e.target.value);
						}}
						className='input'
					/>
					<textarea
						value={editedContent}
						onChange={(e) => setEditedContent(e.target.value)}
						className="textarea"
					/>
					<button onClick={handleSave}>Save</button>
					<button onClick={handleCancel}>Cancel</button>
				</>
			) : (
				<>
					<h1>{editedTitle}</h1>
					<p>{editedContent}</p>
					<button onClick={handleEdit}>
						<EditIcon />
					</button>
					<button onClick={handleDelete}>
						<DeleteOutlineIcon />
					</button>
				</>
			)}
		</div>
	);
};

export default Note;
