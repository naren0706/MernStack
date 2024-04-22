import { MongoClient } from "mongodb";

const uri = "mongodb+srv://naren:1234567890@quizapp.nhfztee.mongodb.net/?retryWrites=true&w=majority&appName=QuizApp";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db("QuizApp");
    const questions = database.collection("questions");
    const cursor = questions.find();

    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
    }
    // replace console.dir with your callback to access individual elements
    console.log(await cursor.toArray());
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
