import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

const Note = (props) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(props.title);
	const [editedContent, setEditedContent] = useState(props.content);
	const [editingText, setEditingText] = useState({ title: "", content: "" });

	function handleDelete() {
		props.deleteItem(props.id);
	}

	function handleEdit() {
		setEditingText({ title: editedTitle, content: editedContent });
		setEditedTitle("");
		setEditedContent("");
		setIsEditing(true);
	}

	function handleSave() {
		if (editedTitle.trim() !== "" || editedContent.trim() !== "") {
			setIsEditing(false);
			props.editedNote(
				{ title: editedTitle, content: editedContent },
				props.id
			);
		} else {
			// this needs to be styled better
			alert("Input fields cannot be empty");
		}
	}

	function handleCancel() {
		setEditedTitle(editingText.title);
		setEditedContent(editingText.content);
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
						className='textarea'
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
