import { useState } from "react";
import Head from "next/head";

// const  staticInput ={
//   "questions": [
//     {
//       "question": "What is the main purpose of medicine?",
//       "options": [
//         "Diagnosis, treatment, and prevention of illness and injury",
//         "Teaching about health and wellness",
//         "Exploring the human body's functions",
//         "Designing medical equipment"
//       ],
//       "correctAnswer": "Diagnosis, treatment, and prevention of illness and injury"
//     },
//     {
//       "question": "What does medicine aim at?",
//       "options": [
//         "Increasing life expectancy",
//         "Maintaining and restoring health",
//         "Curing all diseases",
//         "Improving physical performance"
//       ],
//       "correctAnswer": "Maintaining and restoring health"
//     }
//   ]
// };




export default function Mcq({mcqResultView}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [result, setResult] = useState({ correct: '', wrong: '', rightAnswer: '' });
  const [displayCard, setDisplayCard] = useState(false);

  // const questionsing = 
  const input = mcqResultView
  // console.log(typeof(input) === typeof(staticInput),input,staticInput)

  const onSubmit = () => {
    setDisplayCard(true);
    if (!selectedOption) {
      alert('Please select an option');
      return;
    }

    const currentQuestion = input.questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
      setResult({ correct: 'Correct Answer!', wrong: '', rightAnswer: '' });
    } else {
      setResult({
        correct: '',
        wrong: 'Wrong Answer!',
        rightAnswer: `${currentQuestion.correctAnswer} - Option ${String.fromCharCode(65 + currentQuestion.options.indexOf(currentQuestion.correctAnswer))}`
      });
    }
  };

  const handleNextQuestion = () => {
    setDisplayCard(false);
    setSelectedOption('');
    setResult({ correct: '', wrong: '', rightAnswer: '' });
    if (currentQuestionIndex < input.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    setDisplayCard(false);
    setSelectedOption('');
    setResult({ correct: '', wrong: '', rightAnswer: '' });
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </Head>

      <div className="rounded-md border border-gray-100 shadow-md shadow-emerald-600/30 bg-white p-3 mt-4">
        <div className="flex justify-between xs:mb-2">
          <h3 className="font-semibold text-gray-500">Mcq</h3>
        </div>
        <div className="flex">
          <div className="flex-1 p-4">
            <div className="container mx-auto">
              <div className="flex justify-center">
                <div className="w-full">
                  <div className="flex justify-between shadow mt-3 p-2 bg-white">
                    <button className="text-blue-600" onClick={handlePreviousQuestion}>
                      <i className="bi bi-arrow-left-circle-fill text-2xl"></i>
                    </button>
                    <p className="pt-3">Question {currentQuestionIndex + 1} of {input.questions.length}</p>
                    <button className="text-blue-600" onClick={handleNextQuestion}>
                      <i className="bi bi-arrow-right-circle-fill text-2xl"></i>
                    </button>
                  </div>
                  <p className="pt-3">{input.questions[currentQuestionIndex].question}</p>
                  <div className="bg-white shadow mt-4 p-4">
                    {input.questions[currentQuestionIndex].options.map((option, index) => (
                      <div className="form-check mb-2" key={index}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="option"
                          id={`option${String.fromCharCode(65 + index)}`}
                          value={option}
                          onChange={(e) => setSelectedOption(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor={`option${String.fromCharCode(65 + index)}`}>
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>

                  
            
            
            <button className="bg-emerald-500 hover:bg-emerald-700 p-2 rounded w-full text-white text-sm px-3 cursor-pointer mt-3" type="submit" onClick={onSubmit}>Submit</button>
          

                  {displayCard && <div className="bg-white rounded-lg shadow p-3 mt-4 ">
                    <p id="correct" className="text-green-400">{result.correct}</p>
                    <p id="wrong" className="text-red-400">{result.wrong}</p>
                    <strong id="rightAnswer" className="text-green-400">{result.rightAnswer}</strong>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}