const express = require("express");
const app = express();
const dotenv = require("dotenv");
require("dotenv").config();

const database = require("./config/database");
database.connect();
const PORT = process.env.PORT || 5050;
const questionPaperRoute = require("./routes/Question");
app.get("/", (req, res)=> {
    return res.json({
        success : true,
        message : "Your Server is up and running..."
    })
})



app.use("/api/v1/question-paper", questionPaperRoute);

app.listen(PORT, ()=> {
    console.log(`App is running at ${PORT}`);
})