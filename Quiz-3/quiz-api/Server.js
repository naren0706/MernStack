import express from 'express';
import fs from 'fs';
import cors from 'cors';
import { MongoClient } from "mongodb";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configuration variable to switch between JSON file and MongoDB Atlas
const USE_MONGODB = true;

// MongoDB Atlas connection string
const MONGODB_URI = "mongodb+srv://naren:1234567890@quizapp.nhfztee.mongodb.net/?retryWrites=true&w=majority&appName=QuizApp";

// Function to fetch questions from JSON file
function getQuestionsFromJSON(callback) {
    fs.readFile('E:/React/Quiz-3/quiz-api/Question.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            callback(err, null);
            return;
        }
        const questions = JSON.parse(data);
        callback(null, questions);
    });
}

// Function to fetch questions from MongoDB Atlas
async function getQuestionsFromMongoDB(callback) {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        const database = client.db("QuizApp");
        const questions = database.collection("questions");
        const cursor = questions.find();
        const questionsArray = await cursor.toArray();
        callback(null, questionsArray);
    } finally {
        await client.close();
    }
}

// Route to get quiz questions
app.get('/api/questions', (req, res) => {
    if (USE_MONGODB) {
        // Fetch questions from MongoDB Atlas
        getQuestionsFromMongoDB((err, questions) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.json(questions);
        });
    } else {
        // Fetch questions from JSON file
        getQuestionsFromJSON((err, questions) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.json(questions);
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
