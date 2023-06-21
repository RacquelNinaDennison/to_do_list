import axios from "axios";

export const createUserURL = axios.create({
	baseURL: "http://localhost:8080/auth/register",
	headers: {
		"Content-type": "application/json",
	},
});

export const validateUserURL = axios.create({
	baseURL: "http://localhost:3000/auth/",
	headers: {
		"Content-type": "application/json",
	},
});
