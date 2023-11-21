
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



exports.generateQuestionPaper = async(req, res) => {
    try {
        // Fetch 10 easy questions
        const easyQuestions = await Question.find({ difficulty: 'easy' }).limit(10).select('-_id -__v');

        // Fetch 10 medium questions
        const mediumQuestions = await Question.find({ difficulty: 'medium' }).limit(10).select('-_id -__v');

        // Fetch 3 hard questions
        const hardQuestions = await Question.find({ difficulty: 'hard' }).limit(3).select('-_id -__v');

        // Combine all questions
        const questionPaper = [...easyQuestions, ...mediumQuestions, ...hardQuestions];

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