import { useState } from "react";
import Head from "next/head";

export default function Mcq() {
  const [selectedOption, setSelectedOption] = useState('');
  const [result, setResult] = useState({ correct: '', wrong: '', rightAnswer: '' });
  const [displayCard, setDisplayCard] = useState(false);

  const onSubmit = () => {

    setDisplayCard(true)
    if (!selectedOption) {
      alert('Please select an option');
      return;
    }

    if (selectedOption === 'optionD') {
      setResult({ correct: 'Correct Answer!', wrong: '', rightAnswer: '' });
    } else {
      setResult({
        correct: '',
        wrong: 'Wrong Answer!',
        rightAnswer: 'Transmitting electrical signals between nerve cells - Option D',
      });
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
                  <button className="text-blue-600">
                    <i className="bi bi-arrow-left-circle-fill text-2xl"></i>
                  </button>
                  <p className="pt-3">Question 1 of 20</p>
                  <button className="text-blue-600">
                    <i className="bi bi-arrow-right-circle-fill text-2xl"></i>
                  </button>
                </div>
                <p className="pt-3">Which of the following is not a function of bones in the human body?</p>
                <div className="bg-white shadow mt-4 p-4">
                  <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="option"
                  id="optionA"
                  value="optionA"
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <label className="form-check-label" htmlFor="optionA">
                  Providing structure and support
                </label>
              </div>

              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="option"
                  id="optionB"
                  value="optionB"
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <label className="form-check-label" htmlFor="optionB">
                  Producing red blood cells
                </label>
              </div>

              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="option"
                  id="optionC"
                  value="optionC"
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <label className="form-check-label" htmlFor="optionC">
                  Storing minerals such as calcium and phosphorus
                </label>
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="option"
                  id="optionD"
                  value="optionD"
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <label className="form-check-label" htmlFor="optionD">
                  Transmitting electrical signals between nerve cells
                </label>
              </div>
                  
                </div>
                <button className="bg-emerald-500 p-2 rounded w-full mt-4 text-white text-sm px-3 cursor-pointer" type="button" onClick={onSubmit}>Submit</button>
              

                {/* <div className="border border-gray-200 rounded-lg mb-4">
                <button
                  className="w-full p-4 text-left font-medium text-gray-700 bg-gray-100 rounded-lg focus:outline-none"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {result.correct}
                </button>
                {isOpen && (
                  <div className="p-4 text-gray-600">
                    {<strong id="rightAnswer">{result.rightAnswer}</strong>}
                  </div>
                )}
              </div> */}

                {displayCard && <div className="bg-white rounded-lg shadow p-3 mt-4 ">
                <p id="correct" className=" text-green-400">{result.correct}</p>
                <p id="wrong" className=" text-red-400">{result.wrong}</p>
                <strong id="rightAnswer"className="text-green-400">{result.rightAnswer}</strong>
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
