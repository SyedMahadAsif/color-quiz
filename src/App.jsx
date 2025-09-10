
  import React, { useState } from "react";
  import {
    FaArrowLeft,
    FaArrowRight,
    FaRedo,
    FaCheck,
    FaTimes,
    FaFacebook,
    FaTwitter,
    FaReddit,
    FaSpotify,
    FaYelp,
    FaYoutube,
    FaLinkedin,
    FaPinterest,
    FaInstagram,
    FaWhatsapp,
    FaDiscord,
  } from "react-icons/fa";

  import {
    SiNetflix,
    SiLyft,
    SiSnapchat,
    SiTiktok,
  } from "react-icons/si";

  // Question Data
  const QUESTIONS = [
    {
      id: "twitter",
      title: "Twitter",
      icon: <FaTwitter className="text-sky-500 text-4xl" />,
      options: ["#1FBAD5", "#3179C6", "#008FD8", "#1D9BF0"],
      answer: "#1D9BF0",
    },
    {
      id: "netflix",
      title: "Netflix",
      icon: <SiNetflix className="text-red-600 text-4xl" />,
      options: ["#BC0912", "#E50914", "#FF000D", "#D10000"],
      answer: "#E50914",
    },
    {
      id: "snapchat",
      title: "Snapchat",
      icon: <SiSnapchat className="text-yellow-400 text-4xl" />,
      options: ["#FFFC00", "#FFDF00", "#FFD111", "#FFFE7A"],
      answer: "#FFFC00",
    },
    {
      id: "lyft",
      title: "Lyft",
      icon: <SiLyft className="text-pink-500 text-4xl" />,
      options: ["#FF629E", "#FF70DB", "#FF00BF", "#FF007F"],
      answer: "#FF629E",
    },
    {
      id: "reddit",
      title: "Reddit",
      icon: <FaReddit className="text-orange-500 text-4xl" />,
      options: ["#FE7A00", "#EF3900", "#FF9900", "#FF4500"],
      answer: "#FF4500",
    },
    {
      id: "spotify",
      title: "Spotify",
      icon: <FaSpotify className="text-green-500 text-4xl" />,
      options: ["#1ED760", "#27C102", "#3AAD45", "#75DD65"],
      answer: "#1ED760",
    },
    {
      id: "facebook",
      title: "Facebook",
      icon: <FaFacebook className="text-blue-600 text-4xl" />,
      options: ["#0255C1", "#1877F2", "#4674AE", "#005FDA"],
      answer: "#1877F2",
    },
    {
      id: "yelp",
      title: "Yelp",
      icon: <FaYelp className="text-red-500 text-4xl" />,
      options: ["#FF1A1A", "#C00100", "#E90302", "#C82A2A"],
      answer: "#FF1A1A",
    },
    {
      id: "youtube",
      title: "YouTube",
      icon: <FaYoutube className="text-red-600 text-4xl" />,
      options: ["#FF0000", "#E62117", "#CC0000", "#D90000"],
      answer: "#FF0000",
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      icon: <FaLinkedin className="text-blue-700 text-4xl" />,
      options: ["#0077B5", "#005983", "#0366D6", "#0A66C2"],
      answer: "#0A66C2",
    },
    {
      id: "tiktok",
      title: "TikTok",
      icon: <SiTiktok className="text-black text-4xl" />,
      options: ["#010101", "#000000", "#141414", "#121212"],
      answer: "#000000",
    },
    {
      id: "pinterest",
      title: "Pinterest",
      icon: <FaPinterest className="text-red-600 text-4xl" />,
      options: ["#BD081C", "#C8232C", "#FF0000", "#D1001C"],
      answer: "#E60023",
    },
    {
      id: "instagram",
      title: "Instagram",
      icon: <FaInstagram className="text-pink-500 text-4xl" />,
      options: ["#C13584", "#E1306C", "#FD1D1D", "#F56040"],
      answer: "#E1306C",
    },
    {
      id: "whatsapp",
      title: "WhatsApp",
      icon: <FaWhatsapp className="text-green-500 text-4xl" />,
      options: ["#25D366", "#20C65A", "#1EBE55", "#30D35C"],
      answer: "#25D366",
    },
    {
      id: "discord",
      title: "Discord",
      icon: <FaDiscord className="text-indigo-500 text-4xl" />,
      options: ["#5865F2", "#4E5D94", "#5C6BC0", "#6772E5"],
      answer: "#5865F2",
    },
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
      <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md sm:max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300">

        {/* Header */}
        <header className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">The Color Quiz</h1>
            <p className="mt-1 text-sm sm:text-base text-gray-500">
              You use these apps all the time — can you name their logo colors?
            </p>
          </div>

          <div className="bg-gray-800 flex gap-2 mt-2 text-white text-xs px-3 py-1.5 rounded-lg shadow-md">
            <span className="font-medium">Score:</span> {totalCorrect}
          </div>
        </header>

        {/* MAIN or RESULTS */}
        {showResults ? (
          <main>
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Your Score</h2>
              <p className="mt-2 text-gray-500 text-sm">
                You got <span className="text-black font-semibold">{totalCorrect}</span> out of <span className="text-black font-semibold">{QUESTIONS.length}</span> right.
              </p>
            </div>

            {/* List results for each question */}
            {QUESTIONS.map((q) => {
              const ans = answers[q.id];
              const userSel = ans?.selected;
              const correct = q.answer;

              return (
                <div
                  key={q.id}
                  className="rounded-2xl bg-white p-4 shadow-md border border-gray-200 flex items-start sm:items-center gap-4 mb-4"
                >
                  <div className="text-3xl">{q.icon}</div>

                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-800">{q.title}</h3>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded border" style={{ backgroundColor: correct }} />
                        <span className="text-gray-600">Correct</span>
                      </div>

                      {userSel ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded border" style={{ backgroundColor: userSel }} />
                          <span>Your Answer</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">No Answer</span>
                      )}
                    </div>
                  </div>

                  <div
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      ans?.correct ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
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

            {/* Restart Button */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button onClick={restart} className="px-4 py-2 text-sm rounded-lg border text-gray-700 hover:bg-gray-100 transition">
                <FaRedo className="inline mr-2" /> Try Again
              </button>
              <p className="text-xs text-gray-400">Built by Mahad</p>
            </div>
          </main>
        ) : (
          <main>
            {/* Progress Bar */}
           {/* Progress Pills */}
           <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-xs font-semibold bg-gray-800 text-white px-2 py-1 rounded-md">{index + 1} / {QUESTIONS.length}</span>
          </div>
          <div className="flex gap-1">
            {QUESTIONS.map((q, i) => {
              const isCurrent = i === index;
              const isAnswered = answers[q.id];
              const correct = isAnswered?.correct;

              let bg = 'bg-gray-200';
              if (correct) bg = 'bg-green-500';
              else if (isAnswered) bg = 'bg-red-500';
              else if (isCurrent) bg = 'bg-black';

              return <div key={q.id} className={`h-2 rounded-full transition-all duration-200 flex-1 ${bg}`} />;
            })}
          </div>
        </div>


            {/* Question */}
            <section className="bg-white">
              {/* Logo and Question Title Inline */}
              <div className="flex p-2 items-center justify-start gap-2 mb-4">
             
                  <span className="text-8xl sm:text-9xl">{question.icon}</span>
                

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight max-w-xs">
                  {question.title}
                </h2>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                {question.options.map((hex) => {
                  const ans = answers[question.id];
                  const selected = ans?.selected === hex;
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
                      className="transform transition duration-300 hover:scale-110 active:scale-95"
                    />
                  );
                })}
              </div>

              {/* Feedback */}
              <div className="mt-4 min-h-[36px] text-center text-lg">
                {answers[question.id] ? (
                  answers[question.id].correct ? (
                    <div className="text-green-700 font-bold flex items-center justify-center gap-3">
                      <FaCheck className="text-2xl" /> Correct
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-red-600 font-semibold">
  <div className="flex items-center gap-1">
    <FaTimes className="text-lg" />
    <span >Wrong</span>
  </div>
  {/* <span className="text-gray-500 text-sm font-normal mt-1 sm:mt-0">
    Correct: <code>{question.answer}</code>
  </span> */}
</div>

                  )
                ) : (
                  <div className="text-gray-400 text-base">Tap the color that matches the logo.</div>
                )}
              </div>
            </section>

            {/* Navigation */}
            <footer className=" w-full px-4 sm:px-0 flex flex-col items-center gap-4">

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-5">
                {/* Back */}
                <button
                  onClick={prev}
                  disabled={index === 0}
                  className={`w-10 h-10 rounded-full flex items-center justify-center
                    bg-gray-200 text-gray-800 shadow-md hover:bg-gray-300 active:scale-95
                    transition-all duration-150 ease-in-out disabled:opacity-30 disabled:cursor-not-allowed`}
                >
                  <FaArrowLeft className="text-2xl" />
                </button>

                {/* Next / Submit */}
                <button
                  onClick={next}
                  disabled={!answers[question.id]}
                  className={`w-10 h-10 rounded-full flex items-center justify-center
                    bg-black text-white shadow-md hover:bg-gray-900 active:scale-95
                    transition-all duration-150 ease-in-out disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  {index < QUESTIONS.length - 1 ? (
                    <FaArrowRight className="text-2xl" />
                  ) : (
                    <FaCheck className="text-2xl" />
                  )}
                </button>
              </div>

              {/* Footer Meta */}
              <div className="flex justify-between items-center w-full  text-xs text-gray-500 font-medium pt-2 border-t border-gray-200">
                <span>© 2025 The Color Quiz</span>
                <span className="text-gray-400">Built by Mahad</span>
              </div>
            </footer>
          </main>
        )}
      </div>
    </div>
  );
}
