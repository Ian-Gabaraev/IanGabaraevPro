import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories, getQuestionsByCategory, shuffleArray } from '../data/quizQuestions';
import type { Question } from '../data/quizQuestions';
import './Quiz.css';

type QuizState = 'start' | 'quiz' | 'results';

const Quiz = () => {
  const [state, setState] = useState<QuizState>('start');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState(10);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const sizes = [10, 20, 30, 0]; // 0 = all

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex) / questions.length) * 100 : 0;

  const startQuiz = () => {
    let qs = getQuestionsByCategory(selectedCategory);
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
    setState('quiz');
  };

  const selectOption = (index: number) => {
    if (answered) return;
    setAnswered(true);
    setSelectedOption(index);
    if (index === currentQuestion.correct) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= questions.length) {
      setState('results');
    } else {
      setCurrentIndex(i => i + 1);
      setAnswered(false);
      setSelectedOption(null);
    }
  };

  const resetQuiz = () => {
    setState('start');
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedOption(null);
  };

  const getResultMessage = (percentage: number) => {
    if (percentage === 100) return "Perfect! You're interview-ready.";
    if (percentage >= 80) return "Great job! Almost there.";
    if (percentage >= 60) return "Good effort! Keep studying.";
    if (percentage >= 40) return "Review the concepts and try again.";
    return "Don't give up! Practice makes perfect.";
  };

  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  return (
    <section className="quiz-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="quiz-title">Self Examination</h1>
          <p className="quiz-subtitle">
            Test your JavaScript, TypeScript & React knowledge.
          </p>

          <AnimatePresence mode="wait">
            {state === 'start' && (
              <motion.div
                key="start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="quiz-card start-screen"
              >
                <h2 className="card-heading">Choose a Category</h2>
                <p className="card-text">Select a topic to quiz yourself on:</p>
                
                <div className="option-buttons">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      className={`option-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <h2 className="card-heading" style={{ marginTop: '2rem' }}>Quiz Size</h2>
                <p className="card-text">How many questions?</p>
                
                <div className="option-buttons">
                  {sizes.map(size => (
                    <button
                      key={size}
                      className={`option-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size === 0 ? 'All Available' : `${size} Questions`}
                    </button>
                  ))}
                </div>

                <button className="start-btn" onClick={startQuiz}>
                  Start Quiz
                </button>
              </motion.div>
            )}

            {state === 'quiz' && currentQuestion && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>

                <div className="score-display">
                  Score: <span className="score-value">{score}</span> / {questions.length}
                </div>

                <div className="quiz-card question-card">
                  <div className="question-number">
                    Question {currentIndex + 1} of {questions.length}
                  </div>
                  <div className="question-text">{currentQuestion.question}</div>
                  
                  {currentQuestion.code && (
                    <pre className="code-block">{currentQuestion.code}</pre>
                  )}

                  <div className="options">
                    {currentQuestion.options.map((option, index) => {
                      const letters = ['A', 'B', 'C', 'D'];
                      let className = 'option';
                      if (answered) {
                        className += ' disabled';
                        if (index === currentQuestion.correct) {
                          className += ' correct';
                        } else if (index === selectedOption) {
                          className += ' incorrect';
                        }
                      }
                      return (
                        <button
                          key={index}
                          className={className}
                          onClick={() => selectOption(index)}
                          disabled={answered}
                        >
                          <span className="option-letter">{letters[index]}</span>
                          <span className="option-text">{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {answered && (
                    <motion.div
                      className="explanation"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="explanation-title">Explanation</div>
                      <div className="explanation-text">{currentQuestion.explanation}</div>
                    </motion.div>
                  )}

                  <div className="btn-container">
                    <div />
                    <button
                      className="next-btn"
                      onClick={nextQuestion}
                      disabled={!answered}
                    >
                      {currentIndex + 1 >= questions.length ? 'See Results' : 'Next Question'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {state === 'results' && (
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
                <div className="results-message">{getResultMessage(percentage)}</div>
                <button className="start-btn" onClick={resetQuiz}>
                  Try Again
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
