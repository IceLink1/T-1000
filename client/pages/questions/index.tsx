"use client";

import styles from "./Questions.module.css";

import DefaultLayout from "@/layouts/default";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export interface QuestionsListItem {
  _id: string;
  title: string;
  subject: string;
  teacher: string;
}

export default function IndexPage() {
  const searchParams = useSearchParams();

  const subject = searchParams.get("subject");

  const questions = [1, 2, 3, 4, 5, 6];
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
            {questionsList.map((question) => (
              <Link href={`/questions/${question._id}`}>
                <div className={styles["card"]}>
                  <h2>{question.title}</h2>
                  <div>
                    <span>придмет : {question.subject}</span>
                    <span> {question.teacher}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
