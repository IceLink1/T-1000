"use client";

import QuizCard from "@/components/QuizCard/QuizCard";
import styles from "./Questions.module.css";

import DefaultLayout from "@/layouts/default";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/useStore";
import { fetchQuestions } from "@/lib/store/features/questionSlice";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState<boolean>(false);
  const { questions, loading } = useAppSelector((state) => state.questions);
  const subject = searchParams.get("subject");
  const currentClass = searchParams.get("class");

  useEffect(() => {
    if (subject) {
      dispatch(fetchQuestions({ subject, currentClass })).catch((error) => {
        console.error("Ошибка при загрузке вопросов:", error);
      });
    }
  }, [dispatch, subject]);

  console.log(questions);

  if (!isReady) {
    return (
      <DefaultLayout>
        <div className={styles["isReady"]}>
          <div className={styles["contentIsReady"]}>
            <h1>Готовы?</h1>
            <button onClick={() => setIsReady(true)} className={styles.button}>
              Да Всегда Готов!
            </button>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <section className={styles["main"]}>
        <div className={styles["container"]}>
          <div className={styles["list"]}>
            {loading ? (
              <h1>Loading...</h1>
            ) : (
              <div className={styles["quizList"]}>
                {questions.length > 0 ? (
                  <QuizCard
                    questions={questions}
                    title={`Вопросы по ${subject} для ${currentClass} классов`}
                  ></QuizCard>
                ) : (
                  <h1>Вопросов по предмету "{subject}" пока что нет!</h1>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
