"use client";

import styles from "./Questions.module.css";

import DefaultLayout from "@/layouts/default";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/useStore";
import { fetchQuestions } from "@/lib/store/features/questionSlice";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export interface QuestionsListItem {
  _id: string;
  title: string;
  subject: string;
  teacher: string;
}

export default function IndexPage() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { questions, loading } = useAppSelector((state) => state.questions);

  useEffect(() => {
    dispatch(fetchQuestions()).then((res) => {
      console.log(res.payload);
    });
  }, [searchParams]);

  const subject = searchParams.get("subject");

  const questionsList = [
    {
      _id: "1",
      title: "Question 1",
      subject: "Математика",
      teacher: "Анна Иванова",
    },
    {
      _id: "2",
      title: "Question 2",
      subject: "Математика",
      teacher: "Анна Иванова",
    },
  ];

  return (
    <DefaultLayout>
      <section className={styles["main"]}>
        <div className={styles["container"]}>
          <h1>{subject}</h1>
          <div className={styles["list"]}>
            {loading ? (
              <h1>Loading...</h1>
            ) : (
              <>
                {questionsList.map((question) => (
                  <Link href={`/questions/${question._id}`} key={question._id}>
                    <div className={styles["card"]}>
                      <h2>{question.title}</h2>
                      <div>
                        <span>придмет : {question.subject}</span>
                        <span> {question.teacher}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
