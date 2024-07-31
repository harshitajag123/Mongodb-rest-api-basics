const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded());

//create a model/ schema
const User = mongoose.model("user", {
	firstName: String,
	lastName: String,
	email: String,
	avatar: String,
});

//READ - GET/users
app.get("/users", async (req, res) => {
	const users = await User.find();
	try {
		res.json({
			status: "Server is Up - SUCCESS :) ",
			data: users,
		});
	} catch (error) {
		res.status(500).json({
			status: "Failed",
			message: "Something went wrong",
		});
	}
});

//CREATE - POST/users
app.post("/users", async (req, res) => {
	try {
		const { firstName, lastName, email, avatar } = req.body;
		await User.create({ firstName, lastName, email, avatar });
		res.json({
			status: "SUCCESS",
			message: "User created succesfully",
		});
	} catch (error) {
		res.status(500).json({
			status: "Failed",
			message: "Something went wrong",
		});
	}
});

//UPDATE - PATCH/users/:id
app.patch("/users/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { firstName, lastName, email, avatar } = req.body;
		await User.findByIdAndUpdate(id, { firstName, lastName, email, avatar });
		res.json({
			status: "SUCCESS",
			message: "User updated succesfully",
		});
	} catch (error) {
		res.status(500).json({
			status: "Failed",
			message: "Something went wrong",
		});
	}
});

//DELETE - DELETE/users/:id
app.delete("/users/:id", async (req, res) => {
	try {
		const { id } = req.params;

		await User.findByIdAndDelete(id);
		res.json({
			status: "SUCCESS",
			message: "User delete succesfully",
		});
	} catch (error) {
		res.status(500).json({
			status: "Failed",
			message: "Something went wrong",
		});
	}
});

app.listen(port, () => {
	mongoose
		.connect(process.env.MONGODB_URI)
		.then(() => console.log("DB connection established.."))
		.catch((error) => console.log(error));
});

// const USER = [
// 	{
// 		id: 1,
// 		email: "george.bluth@reqres.in",
// 		first_name: "George",
// 		last_name: "Bluth",
// 		avatar: "https://reqres.in/img/faces/1-image.jpg",
// 	},
// 	{
// 		id: 2,
// 		email: "janet.weaver@reqres.in",
// 		first_name: "Janet",
// 		last_name: "Weaver",
// 		avatar: "https://reqres.in/img/faces/2-image.jpg",
// 	},
// 	{
// 		id: 3,
// 		email: "emma.wong@reqres.in",
// 		first_name: "Emma",
// 		last_name: "Wong",
// 		avatar: "https://reqres.in/img/faces/3-image.jpg",
// 	},
// 	{
// 		id: 4,
// 		email: "eve.holt@reqres.in",
// 		first_name: "Eve",
// 		last_name: "Holt",
// 		avatar: "https://reqres.in/img/faces/4-image.jpg",
// 	},
// 	{
// 		id: 5,
// 		email: "charles.morris@reqres.in",
// 		first_name: "Charles",
// 		last_name: "Morris",
// 		avatar: "https://reqres.in/img/faces/5-image.jpg",
// 	},
// 	{
// 		id: 6,
// 		email: "tracey.ramos@reqres.in",
// 		first_name: "Tracey",
// 		last_name: "Ramos",
// 		avatar: "https://reqres.in/img/faces/6-image.jpg",
// 	},
// ];
