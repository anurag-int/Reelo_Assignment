const express = require("express");
const router = express.Router();


const {createQuestion, generateQuestionPaper, getTotalQuestions} = require("../controllers/Question")



router.post("/add-question", createQuestion);
router.get("/questions-all", getTotalQuestions);
router.get("/generate-question-paper", generateQuestionPaper);


module.exports = router;