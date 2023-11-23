const express = require("express");
const router = express.Router();


const {createQuestion, generateQuestionPaper, getAllQuestions} = require("../controllers/Question")



router.post("/add-question", createQuestion);
router.get("/questions-all", getAllQuestions);
router.post("/generate-question-paper", generateQuestionPaper);


module.exports = router;