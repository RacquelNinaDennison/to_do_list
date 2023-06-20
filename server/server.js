const port = process.env.PORT || 3000;
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());

const users = [{ name: "racquel@gmail.com", password: "1234567" }];
const corOptions = {
	origin: "http://localhost:5174",
};
app.post("/", cors(corOptions), async (req, res) => {
	console.log(req.body);

	const { name, password } = req.body;

	// Find the user object that matches the provided username
	const user = users.find((user) => user.name === name);
	console.log(user);

	// Check if the user exists and the password matches
	if (user && user.password === password) {
		res.json({ message: "1" });
	} else {
		res.json({ message: "0" });
	}
});

app.post("/register", cors(corOptions), async (req, res) => {
	const { name, password } = req.body;
	const user = {
		name: name,
		password: password,
	};
	console.log(users);
	users.push(user);
	res.json({ message: "1" });
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
