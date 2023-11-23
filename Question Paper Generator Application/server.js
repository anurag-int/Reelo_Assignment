const express = require("express");
const app = express();
const dotenv = require("dotenv");
require("dotenv").config();

app.use(express.json());
const database = require("./config/database");
database.connect();
const PORT = process.env.PORT || 5050;
const question_route = require("./routes/Question");


app.get("/", (req, res)=> {
    return res.json({
        success : true,
        message : "Welcome to Question Paper Generator App"
    })
})



app.use("/api/v1/questions", question_route);

app.listen(PORT, ()=> {
    console.log(`App is running at ${PORT}`);
})