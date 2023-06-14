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
					/>
				);
			})}
			<Note key={1} title='Note title' content='Note content' />
			<Footer />
		</div>
	);
}

export default App;
