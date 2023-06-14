import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";

function App() {
	const [notes, updateNotes] = useState([]);
	function updateNote(note) {
		updateNote((prevValue) => {
			return [...prevValue, note];
		});
		// console.log(notes);
	}

	return (
		<div>
			<Header />
			<CreateArea updateNote={updateNote} />
			<Note key={1} title='Note title' content='Note content' />
			<Footer />
		</div>
	);
}

export default App;
