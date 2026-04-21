import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  quizzes,
  getQuizById,
  getQuestionsByCategory,
  shuffleArray,
} from "../data/quizQuestions";
import type { Question, QuizDefinition } from "../data/quizQuestions";
import "./Quiz.css";

type QuizState = "select-quiz" | "configure" | "quiz" | "results";

const Quiz = () => {
  useEffect(() => {
    document.title = "Quiz | Test Your Frontend & AWS Skills | Ian Gabaraev";
    return () => {
      document.title = "Ian Gabaraev | Lead Software Engineer | Python, React, Cloud Expert";
    };
  }, []);

  const [state, setState] = useState<QuizState>("select-quiz");
  const [selectedQuiz, setSelectedQuiz] = useState<QuizDefinition | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSize, setSelectedSize] = useState(10);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [codeAnswer, setCodeAnswer] = useState("");
  const [codeSubmitted, setCodeSubmitted] = useState(false);

  const sizes = [10, 20, 30, 0]; // 0 = all

  const currentQuestion = questions[currentIndex];
  const progress =
    questions.length > 0 ? (currentIndex / questions.length) * 100 : 0;

  const selectQuiz = (quizId: string) => {
    const quiz = getQuizById(quizId);
    if (quiz) {
      setSelectedQuiz(quiz);
      setSelectedCategory("all");
      setState("configure");
    }
  };

  const startQuiz = () => {
    if (!selectedQuiz) return;
    let qs = getQuestionsByCategory(selectedQuiz.id, selectedCategory);
    qs = shuffleArray(qs);
    if (selectedSize > 0) {
      qs = qs.slice(0, selectedSize);
    }
    if (qs.length === 0) return;

    setQuestions(qs);
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedOption(null);
    setState("quiz");
  };

  const selectOption = (index: number) => {
    if (answered) return;
    setAnswered(true);
    setSelectedOption(index);
    if (index === currentQuestion.correct) {
      setScore((s) => s + 1);
    }
  };

  const submitCode = () => {
    if (codeSubmitted) return;
    setCodeSubmitted(true);
    setAnswered(true);
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= questions.length) {
      setState("results");
    } else {
      setCurrentIndex((i) => i + 1);
      setAnswered(false);
      setSelectedOption(null);
      setCodeAnswer("");
      setCodeSubmitted(false);
    }
  };

  const resetQuiz = () => {
    setState("select-quiz");
    setSelectedQuiz(null);
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedOption(null);
    setCodeAnswer("");
    setCodeSubmitted(false);
  };

  const backToQuizSelect = () => {
    setState("select-quiz");
    setSelectedQuiz(null);
    setSelectedCategory("all");
  };

  const getResultMessage = (percentage: number) => {
    if (percentage === 100) return "Perfect! You're interview-ready.";
    if (percentage >= 80) return "Great job! Almost there.";
    if (percentage >= 60) return "Good effort! Keep studying.";
    if (percentage >= 40) return "Review the concepts and try again.";
    return "Don't give up! Practice makes perfect.";
  };

  const percentage =
    questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  return (
    <section className="quiz-page">
      <Helmet>
        <meta
          name="description"
          content="Free interactive quizzes on JavaScript, TypeScript, React, Node.js, CSS, and AWS. Test your frontend development and cloud skills with 200+ questions."
        />
        <link rel="canonical" href="https://iangabaraev.com/quiz/" />
        <meta
          property="og:title"
          content="Quiz | Test Your Frontend & AWS Skills"
        />
        <meta
          property="og:description"
          content="Free interactive quizzes on JavaScript, TypeScript, React, Node.js, and AWS. 200+ questions to test your skills."
        />
        <meta property="og:url" content="https://iangabaraev.com/quiz/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://iangabaraev.com/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Quiz",
            name: "Frontend & AWS Developer Quiz",
            description:
              "Interactive quizzes covering JavaScript, TypeScript, React, Node.js, CSS, accessibility, performance, security, and AWS cloud services.",
            url: "https://iangabaraev.com/quiz",
            author: { "@type": "Person", name: "Ian Gabaraev" },
            educationalLevel: "Intermediate",
            about: [
              { "@type": "Thing", name: "JavaScript" },
              { "@type": "Thing", name: "TypeScript" },
              { "@type": "Thing", name: "React" },
              { "@type": "Thing", name: "AWS" },
            ],
          })}
        </script>
      </Helmet>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="quiz-title">Self Examination</h1>
          <p className="quiz-subtitle">
            Test your knowledge with interactive quizzes.
          </p>

          <AnimatePresence mode="wait">
            {state === "select-quiz" && (
              <motion.div
                key="select-quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="section-label">Available Quizzes</h2>
                <div className="quiz-grid">
                  {quizzes.map((quiz) => (
                    <button
                      key={quiz.id}
                      className="quiz-select-card"
                      onClick={() => selectQuiz(quiz.id)}
                    >
                      <h3 className="quiz-select-title">{quiz.title}</h3>
                      <p className="quiz-select-desc">{quiz.description}</p>
                      <span className="quiz-select-count">
                        {quiz.categories
                          .slice(1)
                          .reduce((sum, c) => sum + c.questions.length, 0)}{" "}
                        questions
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {state === "configure" && selectedQuiz && (
              <motion.div
                key="configure"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="quiz-card start-screen"
              >
                <button className="back-link" onClick={backToQuizSelect}>
                  ← Back to quizzes
                </button>

                <h2 className="card-heading">{selectedQuiz.title}</h2>
                <p className="card-text">{selectedQuiz.description}</p>

                <h3 className="card-subheading">Category</h3>
                <div className="option-buttons">
                  {selectedQuiz.categories.map((cat) => (
                    <button
                      key={cat.id}
                      className={`option-btn ${selectedCategory === cat.id ? "active" : ""}`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <h3 className="card-subheading">Questions</h3>
                <div className="option-buttons">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`option-btn ${selectedSize === size ? "active" : ""}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size === 0 ? "All" : size}
                    </button>
                  ))}
                </div>

                <button className="start-btn" onClick={startQuiz}>
                  Start Quiz
                </button>
              </motion.div>
            )}

            {state === "quiz" && currentQuestion && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="score-display">
                  Score: <span className="score-value">{score}</span> /{" "}
                  {questions.length}
                </div>

                <div className="quiz-card question-card">
                  <div className="question-number">
                    Question {currentIndex + 1} of {questions.length}
                  </div>
                  <div className="question-text">
                    {currentQuestion.question}
                  </div>

                  {currentQuestion.code && (
                    <pre className="code-block">{currentQuestion.code}</pre>
                  )}

                  {currentQuestion.type === "code-input" ? (
                    <div className="code-input-section">
                      <textarea
                        className={`code-textarea${codeSubmitted ? " submitted" : ""}`}
                        value={codeAnswer}
                        onChange={(e) => setCodeAnswer(e.target.value)}
                        placeholder="Type your code here..."
                        rows={6}
                        spellCheck={false}
                        disabled={codeSubmitted}
                      />
                      {!codeSubmitted && (
                        <button
                          className="submit-code-btn"
                          onClick={submitCode}
                          disabled={codeAnswer.trim().length === 0}
                        >
                          Submit Answer
                        </button>
                      )}
                      {codeSubmitted && currentQuestion.answer && (
                        <div className="reference-answer">
                          <div className="reference-label">
                            Reference Answer
                          </div>
                          <pre className="code-block reference-code">
                            {currentQuestion.answer}
                          </pre>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="options">
                      {currentQuestion.options?.map((option, index) => {
                        const letters = ["A", "B", "C", "D"];
                        let className = "option";
                        if (answered) {
                          className += " disabled";
                          if (index === currentQuestion.correct) {
                            className += " correct";
                          } else if (index === selectedOption) {
                            className += " incorrect";
                          }
                        }
                        return (
                          <button
                            key={index}
                            className={className}
                            onClick={() => selectOption(index)}
                            disabled={answered}
                          >
                            <span className="option-letter">
                              {letters[index]}
                            </span>
                            <span className="option-text">{option}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {answered && (
                    <motion.div
                      className="explanation"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="explanation-title">Explanation</div>
                      <div className="explanation-text">
                        {currentQuestion.explanation}
                      </div>
                    </motion.div>
                  )}

                  <div className="btn-container">
                    <div />
                    <button
                      className="next-btn"
                      onClick={nextQuestion}
                      disabled={!answered}
                    >
                      {currentIndex + 1 >= questions.length
                        ? "See Results"
                        : "Next Question"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {state === "results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="quiz-card results-screen"
              >
                <h2 className="results-heading">Quiz Complete</h2>
                <div className="results-score">{percentage}%</div>
                <div className="results-detail">
                  {score} out of {questions.length} correct
                </div>
                <div className="results-message">
                  {getResultMessage(percentage)}
                </div>
                <button className="start-btn" onClick={resetQuiz}>
                  Try Another Quiz
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Quiz;
