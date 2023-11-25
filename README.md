# Question Paper Generator --> Reelo Assignment

This project is a simple API for generating question papers.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- MongoDB
- Postman

### Installing

1. Clone the repository `git clone https://github.com/anurag-int/Reelo_Assignment.git`

2. Move Directory `cd '.\Question Paper Generator Application\'`

3. Start the server with `nodemon server.js`

## API's
      Use Postman for API Testing.
1. `POST http://localhost:4000/api/v1/questions/generate-question-paper`, which generates a question paper. It accepts a JSON body with the following fields:

      - marks: The total marks for the question paper.
      - easy: The percentage of easy questions.
      - medium: The percentage of medium questions.
      - hard: The percentage of hard questions.
      - `{
          "marks": 50,
          "easy": 20,
          "medium": 50,
          "hard": 30
      }`
      - The response is a JSON object.

2. `POST http://localhost:4000/api/v1/questions/add-question`, which will add question in your Question-Bank.

      - subject : The name of the subject.
      - question : Actual Question.
      - difficulty : Difficult level "easy", "medium" or "hard".
      - topic :  Question of which topic
      - `{
          "subject" : "Physics",
          "question" : "What is Concave Lens",
          "difficulty" : "medium",
          "topic" : "Lens"
        }`
      - The response is a JSON object with the generated question paper.

  3. `GET http://localhost:4000/api/v1/question/questions-all`
     - The response is a JSON object which will give all the question available.

    


## Built With

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
