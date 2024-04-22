import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  answerOptions: [
    {
      answerText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    }
  ],
});

const QuestionModel = mongoose.model('Question', QuestionSchema);

export default QuestionModel;
