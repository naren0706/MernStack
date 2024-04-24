import express from 'express';
import cors from 'cors';
import { MongoClient } from "mongodb";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Atlas connection string
const MONGODB_URI = "mongodb+srv://naren:1234567890@quizapp.nhfztee.mongodb.net/?retryWrites=true&w=majority&appName=QuizApp";


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
app.get('/api/LeaderBoard', async (req, res) => {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        const database = client.db("QuizApp");
        const results = database.collection("results");
        const resultArray = await results.find().sort({ score: -1 }).toArray();
        return res.json(resultArray)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})
app.get('/api/getUser', async (req, res) => {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        const database = client.db("QuizApp");
        const results = database.collection("results");
        const id = req.query.id;
        const result = await results.findOne({ _id: id });
        // console.log(result);
        if (!result) {
            return res.json({ "message": false });
        }
        res.json({ "message": true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' }); // Handle errors
    } finally {
        await client.close();
    }
});


// Route to get quiz questions
app.get('/api/questions', (req, res) => {
    // Fetch questions from MongoDB Atlas
    getQuestionsFromMongoDB((err, questions) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(questions);
    });
});

app.post('/api/results', async (req, res) => {
    try {
        const result = req.body;
        const client = new MongoClient(MONGODB_URI);
        try {
            await client.connect(); // Await the connection
            const resultsCollection = client.db("QuizApp").collection("results");
            await resultsCollection.insertOne(result);
            res.status(201).send('Result stored successfully');
        } catch (error) {
            console.error("Failed to connect to MongoDB Atlas:", error);
            res.status(500).send('Failed to connect to MongoDB Atlas');
        } finally {
            client.close(); // Close the connection after use
        }
    } catch (error) {
        console.error("Failed to store result:", error);
        res.status(500).send('Failed to store result');
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
