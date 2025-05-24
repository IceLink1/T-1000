"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import styles from "./Admin.module.css";
import { RootState } from "@/lib/store/store";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/useStore";
import { addQuestion } from "@/lib/store/features/questionSlice";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export default function AdminPage() {
  const { user, token } = useAppSelector((state: RootState) => state.auth);
  const { loading } = useAppSelector((state: RootState) => state.questions);
  const dispatch = useAppDispatch();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [options, setOptions] = useState<string[]>([""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [currentClass, setCurrentClass] = useState("");
  const [currentSubject, setCurrentSubject] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const Classes = [
    "Математика",
    "Физика",
    "Химия",
    "Биология",
    "География",
    "История",
    "Литература",
    "Английский язык",
    "Информатика",
  ];

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
    const newQuestionData = {
      question: newQuestion,
      answers: options.filter((option) => option.trim() !== ""),
      correct: correctAnswer,
      subject: currentSubject,
      currentClass,
    };
    dispatch(addQuestion(newQuestionData))
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          setSuccessMessage("Вопрос успешно добавлен!");
          setNewQuestion("");
          setOptions([""]);
          setCorrectAnswer("");
          setCurrentClass("");
          setCurrentSubject("");
        }
      })
      .catch((error) => {
        setSuccessMessage("Ошибка при добавлении вопроса.");
      });
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

                <div className={styles.formGroup}>
                  <label className={styles.label}>Выберите Класс:</label>
                  <select
                    className={styles.input}
                    value={currentClass}
                    onChange={(e) => setCurrentClass(e.target.value)}
                    required
                  >
                    {[5, 6, 7, 8, 9, 10, 11].map(
                      (option, index) =>
                        option && (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        )
                    )}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Выберите Предмет:</label>
                  <select
                    className={styles.input}
                    value={currentSubject}
                    onChange={(e) => setCurrentSubject(e.target.value)}
                    required
                  >
                    {Classes.map(
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
                  {loading ? (
                    <h1>Loading..</h1>
                  ) : (
                    <button type="submit" className={styles.button}>
                      Добавить вопрос
                    </button>
                  )}
                </div>
              </form>

              {questions.length > 0 && (
                <div className={styles.questionsList}>
                  <h3 className={styles.subtitle}>Добавленные вопросы</h3>
                  {/* {questions.map((q) => (
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
                  ))} */}
                </div>
              )}
            </div>
          </div>
        </ProtectedRoute>
      </section>
    </DefaultLayout>
  );
}
