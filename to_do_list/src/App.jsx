import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import Login from "./components/Login/Login";

function App() {
	const [notes, updateNotes] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [users, setUsers] = useState([{ name: "", password: "" }]);
	useEffect(() => {
		const storedNotes = localStorage.getItem("notes");
		const isLoggedIn = localStorage.getItem("isLoggedIn");
		if (isLoggedIn === "1") {
			setIsLoggedIn(true);
			if (storedNotes) {
				updateNotes(JSON.parse(storedNotes));
			}
		}
	}, []);
	function updateNote(note) {
		updateNotes((prevValue) => {
			localStorage.setItem("notes", JSON.stringify([...prevValue, note]));
			return [...prevValue, note];
		});
	}
	function editedNote(note, id) {
		deleteItem(id);
		updateNote(note);
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

	const loginHandler = (email, password) => {
		localStorage.setItem("isLoggedIn", "1");
		setIsLoggedIn(true);
	};

	const logoutHandler = () => {
		console.log("Handler");
		localStorage.removeItem("isLoggedIn");
		setIsLoggedIn(false);
	};
	return (
		<div>
			{isLoggedIn && (
				<>
					<Header logoutHandler={logoutHandler} />
					<CreateArea updateNote={updateNote} />
					{notes.map((note, index) => {
						return (
							<Note
								id={index}
								key={index}
								title={note.title}
								content={note.content}
								deleteItem={deleteItem}
								editedNote={editedNote}
							/>
						);
					})}
				</>
			)}
			{!isLoggedIn && <Login onLogin={loginHandler} />}
			<Footer />
		</div>
	);
}

export default App;
