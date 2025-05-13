"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import styles from "./Admin.module.css";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [options, setOptions] = useState<string[]>([""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (isAuth === "true") {
      setIsLoggedIn(true);

      const savedQuestions = localStorage.getItem("adminQuestions");
      if (savedQuestions) {
        setQuestions(JSON.parse(savedQuestions));
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "admin" && password === "password") {
      setIsLoggedIn(true);
      localStorage.setItem("adminAuth", "true");
      setLoginError("");
    } else {
      setLoginError("Неверный логин или пароль");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminAuth");
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newQuestion || options.some((opt) => !opt) || !correctAnswer) {
      setSuccessMessage("Пожалуйста, заполните все поля");
      return;
    }

    if (!options.includes(correctAnswer)) {
      setSuccessMessage("Правильный ответ должен быть среди вариантов ответа");
      return;
    }

    const newQuestionObj: Question = {
      id:
        questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1,
      question: newQuestion,
      options: [...options],
      correctAnswer: correctAnswer,
    };

    const updatedQuestions = [...questions, newQuestionObj];
    setQuestions(updatedQuestions);

    localStorage.setItem("adminQuestions", JSON.stringify(updatedQuestions));

    setNewQuestion("");
    setOptions([""]);
    setCorrectAnswer("");
    setSuccessMessage("Вопрос успешно добавлен");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <DefaultLayout>
      <section className={styles.container}>
        {!isLoggedIn ? (
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.title}>Вход в панель администратора</h2>
            </div>
            <div className={styles.cardBody}>
              <form onSubmit={handleLogin}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Логин:</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Пароль:</label>
                  <input
                    type="password"
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {loginError && <p className={styles.error}>{loginError}</p>}
                <div className={styles.cardFooter}>
                  <button type="submit" className={styles.button}>
                    Войти
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.title}>Панель администратора</h2>
              <button
                onClick={handleLogout}
                className={styles.button}
                style={{ alignSelf: "flex-end", marginTop: "0.5rem" }}
              >
                Выйти
              </button>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.subtitle}>Добавить новый вопрос</h3>
              <form onSubmit={handleAddQuestion}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Вопрос:</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Варианты ответов:</label>
                  <div className={styles.optionsContainer}>
                    {options.map((option, index) => (
                      <div key={index} className={styles.optionItem}>
                        <input
                          type="text"
                          className={styles.input}
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(index, e.target.value)
                          }
                          required
                        />
                        {options.length > 1 && (
                          <button
                            type="button"
                            className={styles.removeButton}
                            onClick={() => removeOption(index)}
                          >
                            Удалить
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className={styles.addButton}
                    onClick={addOption}
                  >
                    Добавить вариант
                  </button>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Правильный ответ:</label>
                  <select
                    className={styles.input}
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    required
                  >
                    <option value="">Выберите правильный ответ</option>
                    {options.map(
                      (option, index) =>
                        option && (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        )
                    )}
                  </select>
                </div>

                {successMessage && (
                  <p
                    className={
                      successMessage.includes("успешно")
                        ? styles.success
                        : styles.error
                    }
                  >
                    {successMessage}
                  </p>
                )}

                <div className={styles.cardFooter}>
                  <button type="submit" className={styles.button}>
                    Добавить вопрос
                  </button>
                </div>
              </form>

              {/* Список добавленных вопросов */}
              {questions.length > 0 && (
                <div className={styles.questionsList}>
                  <h3 className={styles.subtitle}>Добавленные вопросы</h3>
                  {questions.map((q) => (
                    <div key={q.id} className={styles.questionItem}>
                      <p>
                        <strong>Вопрос:</strong> {q.question}
                      </p>
                      <p>
                        <strong>Варианты ответов:</strong>{" "}
                        {q.options.join(", ")}
                      </p>
                      <p>
                        <strong>Правильный ответ:</strong> {q.correctAnswer}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </DefaultLayout>
  );
}
