
const Question = require("../models/Question");

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
                // defining marks acc. to difficulty level.
                let marks;
                if(difficulty === "easy") marks = 2;
                else if(difficulty === "medium") marks = 5;
                else marks = 10;

                const question_data = await Question.create({
                    subject,
                    difficulty,
                    question,
                    marks,
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

exports.generateQuestionPaper = async(req, res) => {
    try {
        const totalMarks = 100;
        const distribution = { easy: 0.2, medium: 0.5, hard: 0.3 }; 

        // Calculate the marks for each difficulty level
        const easyMarks = totalMarks * distribution.easy;
        const mediumMarks = totalMarks * distribution.medium;
        const hardMarks = totalMarks * distribution.hard;

        // Fetch questions for each difficulty level
        let easyQuestions = await Question.find({ difficulty: 'easy' }).select('-_id -__v');
        let mediumQuestions = await Question.find({ difficulty: 'medium' }).select('-_id -__v');
        let hardQuestions = await Question.find({ difficulty: 'hard' }).select('-_id -__v');

        // Shuffle the questions within each difficulty level
        shuffleArray(easyQuestions);
        shuffleArray(mediumQuestions);
        shuffleArray(hardQuestions);

        // Select questions for each difficulty level until the required marks are reached
        const selectedEasyQuestions = selectQuestions(easyQuestions, easyMarks);
        const selectedMediumQuestions = selectQuestions(mediumQuestions, mediumMarks);
        const selectedHardQuestions = selectQuestions(hardQuestions, hardMarks);

        // Combine all selected questions
        const questionPaper = [...selectedEasyQuestions, ...selectedMediumQuestions, ...selectedHardQuestions];

        return res.status(200).json({
            success: true,
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


exports.getAllQuestions = async(req, res) => {
    try{
        const allQuestions = await Question.find({},{
            subject : true,
            difficulty : true,
            question : true,
            topic : true,
            marks : true,
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