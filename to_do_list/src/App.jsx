import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";

function App() {
	const [notes, updateNotes] = useState([]);
	function updateNote(note) {
		updateNotes((prevValue) => {
			return [...prevValue, note];
		});
	}

	function deleteItem(id) {
    
		updateNotes((prevNotes) => {
			return prevNotes.filter((_notes, index) => {
				return index !== id;
			});
		});
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
