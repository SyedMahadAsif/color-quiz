import React, { useState } from "react";
import {
  FaArrowLeft, FaArrowRight, FaRedo, FaCheck, FaTimes,
  FaFacebook, FaTwitter, FaReddit, FaSpotify, FaYelp
} from "react-icons/fa";
import { SiNetflix, SiLyft, SiSnapchat } from "react-icons/si";

// Question Data
const QUESTIONS = [
  { id: "twitter", title: "Twitter", icon: <FaTwitter className="text-sky-500 text-4xl" />, options: ["#1FBAD5", "#3179C6", "#008FD8", "#1D9BF0"], answer: "#1D9BF0" },
  { id: "netflix", title: "Netflix", icon: <SiNetflix className="text-red-600 text-4xl" />, options: ["#BC0912", "#E50914", "#FF000D", "#D10000"], answer: "#E50914" },
  { id: "snapchat", title: "Snapchat", icon: <SiSnapchat className="text-yellow-400 text-4xl" />, options: ["#FFFC00", "#FFDF00", "#FFD111", "#FFFE7A"], answer: "#FFFC00" },
  { id: "lyft", title: "Lyft", icon: <SiLyft className="text-pink-500 text-4xl" />, options: ["#FF629E", "#FF70DB", "#FF00BF", "#FF007F"], answer: "#FF629E" },
  { id: "reddit", title: "Reddit", icon: <FaReddit className="text-orange-500 text-4xl" />, options: ["#FE7A00", "#EF3900", "#FF9900", "#FF4500"], answer: "#FF4500" },
  { id: "spotify", title: "Spotify", icon: <FaSpotify className="text-green-500 text-4xl" />, options: ["#1ED760", "#27C102", "#3AAD45", "#75DD65"], answer: "#1ED760" },
  { id: "facebook", title: "Facebook", icon: <FaFacebook className="text-blue-600 text-4xl" />, options: ["#0255C1", "#1877F2", "#4674AE", "#005FDA"], answer: "#1877F2" },
  { id: "yelp", title: "Yelp", icon: <FaYelp className="text-red-500 text-4xl" />, options: ["#FF1A1A", "#C00100", "#E90302", "#C82A2A"], answer: "#FF1A1A" },
];

// Swatch Button Component
function SwatchButton({ hex, onClick, disabled, selected, correct, showResult }) {
  const borderClass = selected ? "ring-4 ring-offset-2" : "ring-1";
  const ringColor = showResult && correct
    ? "ring-green-400"
    : showResult && !correct && selected
    ? "ring-red-400"
    : "ring-transparent";

  return (
    <button
      onClick={() => onClick(hex)}
      disabled={disabled}
      className={`flex-1 min-w-0 h-20 sm:h-24 rounded-lg shadow-inner transition-transform duration-150 ${borderClass} ${ringColor} hover:scale-105`}
      aria-label={`Color ${hex}`}
      style={{ backgroundColor: hex }}
    />
  );
}

// Main App
export default function App() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const question = QUESTIONS[index];

  function handleSelect(hex) {
    if (answers[question.id]) return;
    const correct = hex.toUpperCase() === question.answer.toUpperCase();
    setAnswers(prev => ({ ...prev, [question.id]: { selected: hex, correct } }));
  }

  function next() {
    if (index < QUESTIONS.length - 1) setIndex(i => i + 1);
    else setShowResults(true);
  }

  function prev() {
    if (index > 0) setIndex(i => i - 1);
  }

  function restart() {
    setIndex(0);
    setAnswers({});
    setShowResults(false);
  }

  const totalCorrect = Object.values(answers).filter(a => a.correct).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 sm:p-8">

        {/* Header */}
        <header className="mb-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">The Color Quiz</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            You use these apps all the time — can you name their logo colors?
          </p>
        </header>

        {!showResults ? (
          <main>
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{index + 1} / {QUESTIONS.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-300"
                  style={{ width: `${(index / (QUESTIONS.length - 1)) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <section className="mb-6 text-center">
              <div className="flex justify-center mb-4">{question.icon}</div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">{question.title}</h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {question.options.map((hex) => {
                  const ans = answers[question.id];
                  const selected = ans && ans.selected === hex;
                  const show = !!ans;
                  return (
                    <SwatchButton
                      key={hex}
                      hex={hex}
                      onClick={handleSelect}
                      disabled={!!ans}
                      selected={selected}
                      correct={hex.toUpperCase() === question.answer.toUpperCase()}
                      showResult={show}
                    />
                  );
                })}
              </div>

              {/* Feedback */}
              <div className="mt-4 min-h-[2.25rem] text-sm sm:text-base">
                {answers[question.id] ? (
                  answers[question.id].correct ? (
                    <div className="text-green-600 font-medium flex items-center justify-center gap-2"><FaCheck /> Correct</div>
                  ) : (
                    <div className="text-gray-700 flex flex-col sm:flex-row gap-1 sm:gap-2 items-center justify-center">
                      <span className="flex items-center gap-1 text-red-500"><FaTimes /> <strong>Good try</strong></span>
                      <span className="text-sm text-gray-500">Correct: <code>{question.answer}</code></span>
                    </div>
                  )
                ) : (
                  <div className="text-gray-500">Click the color that matches the company logo.</div>
                )}
              </div>
            </section>

            {/* Navigation */}
            <footer className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={prev}
                  disabled={index === 0}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                >
                  <FaArrowLeft className="inline mr-2" /> Back
                </button>
                <button
                  onClick={next}
                  disabled={!answers[question.id]}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  {index < QUESTIONS.length - 1 ? (
                    <>Next <FaArrowRight className="inline ml-1" /></>
                  ) : "See Results"}
                </button>
              </div>
              <div className="text-sm text-gray-600">Score: <span className="font-medium">{totalCorrect}</span></div>
            </footer>
          </main>
        ) : (
          <main>
            {/* Results */}
            <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold">Results</h2>
              <p className="text-gray-600 mt-2">
                You scored <span className="text-indigo-600 font-bold">{totalCorrect}</span> out of {QUESTIONS.length}.
              </p>
            </div>

            {/* Results List */}
            <div className="space-y-4">
              {QUESTIONS.map((q) => {
                const ans = answers[q.id];
                const userSel = ans ? ans.selected : null;
                const correct = q.answer;
                return (
                  <div
                    key={q.id}
                    className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg bg-white shadow-sm"
                  >
                    <div className="text-3xl">{q.icon}</div>
                    <div className="flex-1 w-full sm:w-auto">
                      <div className="font-medium text-gray-800">{q.title}</div>
                      <div className="text-sm text-gray-500">
                        Correct: <code>{correct}</code>
                      </div>
                    </div>
                    <div className="w-16 h-16 rounded-md border flex items-center justify-center bg-gray-50">
                      {userSel ? (
                        <span className="text-sm font-mono">{userSel}</span>
                      ) : (
                        <span className="text-sm text-gray-400">No answer</span>
                      )}
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        ans?.correct
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {ans?.correct ? (
                        <>
                          <FaCheck className="inline mr-1" /> Correct
                        </>
                      ) : (
                        <>
                          <FaTimes className="inline mr-1" /> Wrong
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
              <button
                onClick={restart}
                className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <FaRedo /> Try again
              </button>
              <p className="text-sm text-gray-400">Created By Mahad</p>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
