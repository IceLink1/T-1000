"use client";

import { useState } from "react";
import { useRouter } from 'next/router';

import styles from "./Questions.module.css";

import DefaultLayout from "@/layouts/default";

export default function QuestionPage() {
  
  const questions = [
    {
      id: 1,
      question:
        "Какой язык программирования наиболее популярен для веб-разработки?",
      options: ["JavaScript", "Python", "Java", "C++"],
      correctAnswer: "Java",
    },
    {
      id: 2,
      question: "Что такое React?",
      options: [
        "База данных",
        "Язык программирования",
        "JavaScript библиотека для создания пользовательских интерфейсов",
        "Операционная система",
      ],
      correctAnswer:
        "JavaScript библиотека для создания пользовательских интерфейсов",
    },
    {
      id: 3,
      question: "Что такое CSS?",
      options: [
        "Язык программирования",
        "Язык разметки",
        "Язык стилей",
        "Фреймворк JavaScript",
      ],
      correctAnswer: "Язык стилей",
    },
    {
      id: 4,
      question: "Какой тег используется для создания ссылки в HTML?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      correctAnswer: "<a>",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
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
    <DefaultLayout>
      <section className={styles.conteiner}>
        <div className={styles.card}>
          {!showResult ? (
            <>
              <div className={styles.cardHeader}>
                <h2 className={styles.title}>Квиз по веб-разработке</h2>
                <div className={styles.progressContainer}>
                  <div
                    className={styles.progressBar}
                    style={{
                      width: `${((currentQuestion + 1) * 100) / questions.length}%`,
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
                  {questions[currentQuestion].options.map((option, index) => (
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
                  Вы ответили правильно на {score} из {questions.length}{" "}
                  вопросов
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
      </section>
    </DefaultLayout>
  );
}
