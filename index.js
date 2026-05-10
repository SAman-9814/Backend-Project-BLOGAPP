const express = require("express");
const app = express();

//load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware to parse json request body
app.use(express.json());

//import routes for to API
const blog = require("./routes/blog");

//mount the todo API routes
app.use("/api/v1", blog);

//connect to the database
const connectWithDb = require("./config/database");
connectWithDb();

//start server
app.listen(PORT, () => {
    console.log(`App id started at Port no ${PORT}`);
})

//default Route
app.get("/", (req, res) => {
    res.send(`<h1>This is Aman Sah</h1>`);
})