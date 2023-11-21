const express = require("express");
const app = express();
const dotenv = require("dotenv");
require("dotenv").config();

const database = require("./config/database");
database.connect();
const PORT = process.env.PORT || 5050;


app.get("/", (req, res)=> {
    return res.json({
        success : true,
        message : "Your Server is up and running..."
    })
})

app.listen(PORT, ()=> {
    console.log(`App is running at ${PORT}`);
})