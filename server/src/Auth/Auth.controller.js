import { registerUser, validateUser } from "./Auth.services.js";

export const createUser = async (req, res) => {
	const { name, password } = req.body;
	const user = await registerUser(name, password);
	if (user) {
		res.send({
			status: "1",
			message: "Successfully registered user",
		});
	}
};

export const checkUser = async (req, res) => {
	const { name, password } = req.body;
	const user = await validateUser(name, password);
	if (user === "1") {
		res.send({ status: "1" });
	}
	if (user === "0") {
		res.send({ status: "0" });
	}
};
