import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { Toaster, toast } from "react-hot-toast";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import Login from "./components/Login/Login";

function App() {
	const [user, setUser] = useState("");
	const sendMessageLogin = (email, password) => {
		fetch("http://localhost:3000/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: email,
				password: password,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data.message);
				const userFeedback = data.message;
				setUser(userFeedback);

				// Handle data
			});
	};
	const sendMessageRegister = (email, password) => {
		fetch("http://localhost:3000/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: email,
				password: password,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data.message);
				const userFeedback = data.message;
				setUser(userFeedback);

				// Handle data
			});
	};
	const [notes, updateNotes] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

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

	const loginHandler = async (email, password) => {
		await sendMessageLogin(email, password);
		if (user == "1") {
			localStorage.setItem("isLoggedIn", "1");
			setIsLoggedIn(true);
		} else {
			alert("Invalid Credentials, try again");
		}
	};

	const registerHandler = async (email, password) => {
		await sendMessageRegister(email, password);
		if (user == "1") {
			localStorage.setItem("isLoggedIn", "1");
			setIsLoggedIn(true);
		} else {
			toast("Invalid Credentials, try again");
			alert("Invalid Credentials, try again");
		}
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
			{!isLoggedIn && (
				<Login onLogin={loginHandler} onRegister={registerHandler} />
			)}
			<Footer />
		</div>
	);
}

export default App;
