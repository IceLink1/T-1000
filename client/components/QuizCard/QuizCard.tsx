"use client";

import { useState } from "react";
import styles from "./QuizCard.module.css";
import { Question } from "@/types";

interface QuizCardProps {
  questions: Question[];
  title?: string;
}

export default function QuizCard({
  questions,
  title = "Квиз по веб-разработке",
}: QuizCardProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion === questions.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {!showResult ? (
          <>
            <div className={styles.cardHeader}>
              <h2 className={styles.title}>{title}</h2>
              <div className={styles.progressContainer}>
                <div
                  className={styles.progressBar}
                  style={{
                    width: `${((currentQuestion) * 100) / questions.length}%`,
                  }}
                ></div>
              </div>
              <p className={styles.text}>
                Вопрос {currentQuestion + 1} из {questions.length}
              </p>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.subtitle}>
                {questions[currentQuestion].question}
              </h3>
              <div className={styles.radioGroup}>
                {questions[currentQuestion].answers.map((option, index) => (
                  <label key={index} className={styles.radioItem}>
                    <input
                      type="radio"
                      className={styles.radioInput}
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={() => handleAnswerSelect(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
            <div className={`${styles.cardFooter} ${styles.justifyEnd}`}>
              <button
                className={styles.button}
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
              >
                {currentQuestion === questions.length - 1
                  ? "Завершить"
                  : "Следующий вопрос"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.cardHeader}>
              <h2 className={styles.title}>Результаты квиза</h2>
            </div>
            <div className={`${styles.cardBody} ${styles.textCenter}`}>
              <h3 className={styles.subtitle}>
                Вы ответили правильно на {score} из {questions.length} вопросов
              </h3>
              <p className={styles.text}>
                {score === questions.length
                  ? "Отлично! Вы ответили на все вопросы правильно!"
                  : score >= questions.length / 2
                    ? "Хороший результат! Вы можете попробовать еще раз."
                    : "Попробуйте еще раз, чтобы улучшить свой результат."}
              </p>
            </div>
            <div className={`${styles.cardFooter} ${styles.justifyCenter}`}>
              <button className={styles.button} onClick={handleRestartQuiz}>
                Пройти квиз заново
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
