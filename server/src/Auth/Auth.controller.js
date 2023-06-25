import { registerUser, validateUser } from "./Auth.services.js";

export const createUser = async (req, res) => {
	const { name, password } = req.body;
	console.log(req.body);
	const user = await registerUser(name, password);
	console.log("waoyong");
	if (user) {
		res.json({
			status: "1",
			message: "Successfully registered user",
			user: user,
		});
	}
};

export const checkUser = async (req, res) => {
	const { name, password } = req.body;
	console.log(req.body);

	const user = await validateUser(name, password);
	console.log(user);
	if (user) {
		console.log("Hello");
		res.json({ status: "1", user: user });
	} else {
		res.json({ status: "0" });
	}
};
