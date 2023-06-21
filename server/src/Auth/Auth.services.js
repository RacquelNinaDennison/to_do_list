import { prisma } from "../../utils.js";
import { users } from "../../database/users.js";

export const registerUser = async (name, password) => {
	// first check that they are not already registered in the database
	const user = await prisma.user.create({
		data: {
			name: name,
			password: password,
		},
	});

	console.log(user);
	return "1";
};

export const validateUser = (name, password) => {
	// Find the user object that matches the provided username
	const user = users.find((user) => user.name === name);
	console.log(user);

	// Check if the user exists and the password matches
	if (user && user.password === password) {
		return "1";
	} else {
		return "0";
	}
};
