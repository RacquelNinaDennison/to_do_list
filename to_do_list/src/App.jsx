import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import Footer from "./components/Footer/Footer";
import Note from "./components/Notes/Note";
import CreateArea from "./components/TextArea/CreateArea";
import { useMutation } from "react-query";
import Login from "./components/Login/Login";

function App() {
	const [userId, setUserId] = useState(null);
	const [notes, updateNotes] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// data mutations - log in users
	// const noteMutation = useMutation(async (note) => {
	// 	return await axios.get("http://localhost:3000/note/:{userId}/");
	// });
	const mutationSign = useMutation(
		async (login) => {
			console.log("hello");
			return await axios.post("http://localhost:3000/auth/", login);
		},
		{
			onSuccess: (data) => {
				if (data.data.status === "1") {
					localStorage.setItem("isLoggedIn", "1");
					setIsLoggedIn(true);
					setUserId(data.data.user.id);
				} else {
					toast("Invalid Credentials, try again");
				}
			},
		}
	);

	const mutationRegister = useMutation(
		async (register) => {
			return await axios.post("http://localhost:3000/auth/register", register);
		},
		{
			onSuccess: (data) => {
				if (data.data.status === "1") {
					toast("Successfully registered. Login with credentials");
				} else {
					toast("Error occured. Try again");
				}
			},
		}
	);

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
		mutationSign.mutate({ name: email, password: password });
	};

	const registerHandler = async (email, password) => {
		mutationRegister.mutate({ name: email, password: password });
	};

	const logoutHandler = () => {
		localStorage.removeItem("isLoggedIn");
		setIsLoggedIn(false);
	};

	return (
		<div>
			<Toaster />
			{isLoggedIn && (
				<>
					<Header logoutHandler={logoutHandler} />
					<CreateArea updateNote={updateNote} userId={userId} />
					<Note userId={userId} />
				</>
			)}
			{!isLoggedIn && (
				<Login
					onLogin={loginHandler}
					onRegister={registerHandler}
					isLoading={mutationSign}
				/>
			)}
			<Footer />
		</div>
	);
}

export default App;
