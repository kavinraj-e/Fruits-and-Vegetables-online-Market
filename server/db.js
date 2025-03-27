const mongoose = require("mongoose");

module.exports = () => {
	try {

		mongoose.connect(process.env.DB);

		console.log("Connected to database");
	} catch (error) {
		console.log(error);
		console.log("not connect database!");
	}
};
