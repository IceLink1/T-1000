"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import styles from "./Admin.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/router";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export default function AdminPage() {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [options, setOptions] = useState<string[]>([""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Загрузка вопросов из localStorage
    const savedQuestions = localStorage.getItem("adminQuestions");
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

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
        <ProtectedRoute adminOnly={true}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.title}>Панель администратора</h2>
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
        </ProtectedRoute>
      </section>
    </DefaultLayout>
  );
}
