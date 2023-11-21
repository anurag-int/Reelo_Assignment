const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    subject : {
        type : String,
        required : true,
        trim : true
    },
    difficulty : {
        type : String,
        required : true,
        trim : true
    },
    question : {
        type : String,
        required : true,
        trim : true
    },
    topic : {
        type : String,
        required : true,
        trim : true
    },
    marks : {
        type : Number,
    }
});

module.exports = mongoose.model("Question-Store", questionSchema);


