import { prisma } from "../../utils.js";

export const registerUser = async (name, password) => {
	// first check that they are not already registered in the database
	const user = await prisma.user.create({
		data: {
			name: name,
			password: password,
		},
	});

	console.log(user);
	return user;
};

export const validateUser = async (name, password) => {
	// Find the user object that matches the provided username
	const user = await prisma.user.findUnique({
		where: {
			name: name,
		},
	});
	console.log(user);
	// Check if the user exists and the password matches
	if (user && user.password === password) {
		console.log("Mathched");
		return user;
	} else {
		return null;
	}
};
