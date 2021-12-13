const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

app.use(express.json({ extended: false }));

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

const PORT = process.env.PORT || 8080;

const server = app.listen(
	PORT,
	console.log(
		`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
	)
);

process.on("unhandledRejection", (err, promise) => {
	console.log(`Error: ${err.message}`);
	server.close(() => process.exit(1));
});
