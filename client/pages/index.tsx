"use client";

import { useState } from "react";

import styles from "./Home.module.css";

import DefaultLayout from "@/layouts/default";
import Link from "next/link";
import Image from "next/image";

export default function IndexPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState("");

  const handlerSubject = (subject: string) => {
    setIsOpen(true);
    setCurrentSubject(subject);
  };

  const subjects = [
    {
      id: 1,
      title: "Математика",
      image: "/images/math.jpg",
      questionCount: 12,
    },
    {
      id: 2,
      title: "Английский",
      image: "/images/english.jpg",
      questionCount: 8,
    },
    {
      id: 3,
      title: "Химия",
      image: "/images/chemistry.jpg",
      questionCount: 10,
    },
    {
      id: 4,
      title: "Биология",
      image: "/images/biology.jpg",
      questionCount: 15,
    },
    {
      id: 5,
      title: "География",
      image: "/images/geography.jpg",
      questionCount: 9,
    },
    {
      id: 6,
      title: "История",
      image: "/images/history.jpg",
      questionCount: 14,
    },
    {
      id: 7,
      title: "Литература",
      image: "/images/literature.jpg",
      questionCount: 11,
    },
    {
      id: 9,
      title: "Физика",
      image: "/images/physics.jpg",
      questionCount: 13,
    },
    {
      id: 10,
      title: "Информатика",
      image: "/images/computer-science.jpg",
      questionCount: 16,
    },
  ];

  return (
    <DefaultLayout>
      <section className={styles.home}>
        <div className={styles.items}>
          {subjects.map((subject) => (
            <div
              className={styles.conteiner}
              onClick={() => handlerSubject(subject.title)}
              key={subject.id}
            >
              <img
                src={subject.image}
                alt={subject.title}
                className={styles.subjectImage}
                onError={(e) => {
                  e.currentTarget.src = "/images/default-subject.jpg";
                }}
              />
              <div className={styles.infoBar}>
                <h2 className={styles.subjectTitle}>{subject.title}</h2>
                <span className={styles.questionCount}>
                  {subject.questionCount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
      {isOpen && (
        <div className={styles["popup"]} onClick={() => setIsOpen(false)}>
          <div className={styles["selectClass"]}>
            <h1>Выберите класс</h1>
            <div className={styles["list"]}>
              {[5, 6, 7, 8, 9, 10, 11].map((item) => (
                <Link
                  href={`/questions?subject=${currentSubject}&class=${item}`}
                  key={item}
                >
                  <div className={styles["item"]}>{item}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}
