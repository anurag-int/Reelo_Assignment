const Question = require("../models/Question");
const express = require("express");
const app = express();

app.use(express.json());

// add question to your database 
exports.createQuestion = async(req, res) => {
    try{
            let {subject, difficulty, question, topic} = req.body;

            if(!subject || !difficulty || !question || !topic)
            {
                return res.status(403).send({
                    success : false,
                    message : "All Fields are required"
                })
            }
            subject = subject.toLowerCase();
            difficulty = difficulty.toLowerCase();
            question = question.toLowerCase();
            topic = topic.toLowerCase();

            if(difficulty != "easy" && difficulty != "medium" && difficulty != "hard")
            {
                return res.status(403).send({
                    success : false,
                    message : "Set the correct difficulty as Easy, Medium, Hard"
                })
            }

            // checking if already that question present in database or not.
            
            const existingQuestion = await Question.findOne({question});
            if(existingQuestion){
                return res.status(400).json({
                    success : false,
                    message : "Question already there"
                })
            }

            // if question not present in database
            else
            {
                
                const question_data = await Question.create({
                    subject,
                    difficulty,
                    question,
                    topic
                })

                return res.status(200).json({
                    success : true,
                    message : "Question saved successfully"
                })
            }

    }
    catch(error){
        console.error(error);
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function selectQuestions(questions, requiredMarks) {
    let selectedQuestions = [];
    let totalMarks = 0;

    for (let question of questions) {
        if (totalMarks + question.marks > requiredMarks) {
            break;
        }

        selectedQuestions.push(question);
        totalMarks += question.marks;
    }

    return selectedQuestions;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function selectQuestions(questions, count) {
    return questions.slice(0, count);
}

exports.generateQuestionPaper = async(req, res) => {
    try {
        let totalMarks = req.body.marks;
        let easyPercent = req.body.easy / 100;
        let mediumPercent = req.body.medium / 100;
        let hardPercent = req.body.hard / 100;

        // Define the marks for each question of each difficulty level
        const easyQuestionMarks = 2;
        const mediumQuestionMarks = 5;
        const hardQuestionMarks = 10;

        // Calculate the number of questions for each difficulty level
        const easyQuestionsCount = Math.floor((totalMarks * easyPercent) / easyQuestionMarks);
        const mediumQuestionsCount = Math.floor((totalMarks * mediumPercent) / mediumQuestionMarks);
        const hardQuestionsCount = Math.floor((totalMarks * hardPercent) / hardQuestionMarks);

        // Fetch questions for each difficulty level
        let easyQuestions = await Question.find({ difficulty: 'easy' }).select('-_id -__v');
        let mediumQuestions = await Question.find({ difficulty: 'medium' }).select('-_id -__v');
        let hardQuestions = await Question.find({ difficulty: 'hard' }).select('-_id -__v');

        // Shuffle the questions within each difficulty level
        shuffleArray(easyQuestions);
        shuffleArray(mediumQuestions);
        shuffleArray(hardQuestions);

        // Select questions for each difficulty level
        const selectedEasyQuestions = selectQuestions(easyQuestions, easyQuestionsCount);
        const selectedMediumQuestions = selectQuestions(mediumQuestions, mediumQuestionsCount);
        const selectedHardQuestions = selectQuestions(hardQuestions, hardQuestionsCount);

        // Combine all selected questions
        const questionPaper = [...selectedEasyQuestions, ...selectedMediumQuestions, ...selectedHardQuestions];

        return res.status(200).json({
            success: true,
            "Total Marks": totalMarks,
            "Easy Questions": easyQuestionsCount,
            "Medium Questions": mediumQuestionsCount,
            "Hard Questions": hardQuestionsCount,
            "Marks per Easy Question": easyQuestionMarks,
            "Marks per Medium Question": mediumQuestionMarks,
            "Marks per Hard Question": hardQuestionMarks,
            questionPaper
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}




exports.getAllQuestions = async(req, res) => {
    try{
        const allQuestions = await Question.find({},{
            subject: { $exists: true, $ne: null },
            difficulty: { $exists: true, $ne: null },
            question: { $exists: true, $ne: null },
            topic: { $exists: true, $ne: null },
        }).select({
            subject : true,
            difficulty : true,
            question : true,
            topic : true,
            _id : false,
        });
        let objLength = Object.keys(allQuestions).length;

        if(!allQuestions || objLength == 0){
            return res.status(200).json({
                success : true,
                "Total Questions" : 0,
                "message" : "Questions Not Available"
            })
        }
        else{
            return res.status(200).json({
                success : true,
                "Total Questions Available" : objLength,
                "message" : "Here are the available questions",
                data : allQuestions

            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            "success" : "false",
            "message" : "Internal Server Error"

        })
    }
}