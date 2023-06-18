import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";

function App() {
	const [notes, updateNotes] = useState([]);
	useEffect(() => {
		const storedNotes = localStorage.getItem("notes");
		if (storedNotes) {
			updateNotes(JSON.parse(storedNotes));
		}
	}, []);
	function updateNote(note) {
		updateNotes((prevValue) => {
			localStorage.setItem("notes", JSON.stringify([...prevValue, note]));
			return [...prevValue, note];
		});
	}

	function deleteItem(id) {
		updateNotes((prevNotes) => {
			return prevNotes.filter((_notes, index) => {
				return index !== id;
			});
		});
		const updatedNotes = [...notes];
		updatedNotes.splice(id, 1);
		localStorage.setItem("notes", JSON.stringify(updatedNotes));
	}

	return (
		<div>
			<Header />
			<CreateArea updateNote={updateNote} />
			{notes.map((note, index) => {
				return (
					<Note
						id={index}
						key={index}
						title={note.title}
						content={note.content}
						deleteItem={deleteItem}
					/>
				);
			})}
			<Footer />
		</div>
	);
}

export default App;
