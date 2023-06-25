import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import { ErrorText } from "../Error/ErrorText";
import { SingleNote } from "../SingleNote/SingleNote";
import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";

const getNotes = async () => {
	const userId = localStorage.getItem("userID");
	const response = await axios.get(`http://localhost:3000/note/${userId}`);
	console.log(response.data);
	return response.data;
};

const CreateArea = (props) => {
	const queryClient = useQueryClient();
	const [note, setNote] = useState({ title: "", content: "" });
	const [takingNote, setTakingNote] = useState(false);
	const [emptyField, setEmptyField] = useState(false);
	const userId = localStorage.getItem("userID");

	const { isLoading, error, data, isSuccess } = useQuery("getNotes", getNotes);
	if (isLoading) {
		return <h1>Loading</h1>;
	}

	if (error) {
		return "Error";
	}

	const createNoteMutation = useMutation(
		(content) => {
			return axios.post(`http://localhost:3000/note/${userId}`, content);
		},
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries(["getNotes"]);
			},
			onError: (message) => {
				console.log(message);
			},
		}
	);

	const deleteMutation = useMutation(
		(id) => {
			console.log("Id in the mutation " + id);
			return axios.delete(`http://localhost:3000/note/${id}`);
		},
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries(["getNotes"]);
			},
			onError: ({ message }) => {
				console.log(message);
			},
		}
	);

	const handleDelete = (id) => {
		deleteMutation.mutateAsync(id);
	};

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
		if (note.title.trim() !== "" || note.content.trim() !== "") {
			createNoteMutation.mutate(note); // call the mutation to update the note
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

			{data.notes.map((note) => (
				<SingleNote
					title={note.title}
					content={note.content}
					id={note.id}
					delete={handleDelete}
					key={note.id}
				/>
			))}
		</div>
	) : (
		<div>
			<ErrorText exitButton={exitButton} />
		</div>
	);
};

export default CreateArea;
