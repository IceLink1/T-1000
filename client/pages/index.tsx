"use client";

import { useState } from "react";

import styles from "./Home.module.css";

import DefaultLayout from "@/layouts/default";
import Link from "next/link";

export default function IndexPage() {
  const subjects = [
    { id: 1, title: "Math" },
    { id: 2, title: "English" },
    { id: 3, title: "Chemistry" },
    { id: 4, title: "Biology" },
    { id: 5, title: "Geography" },
    { id: 6, title: "History" },
    { id: 7, title: "Literature" },
    { id: 8, title: "Philosophy" },
  ];
  return (
    <DefaultLayout>
      <section className={styles.home}>
        <div className={styles["items"]}>
          {subjects.map((subject) => (
            <Link href={`/questions?subject=${subject.title}`} key={subject.id}>
              <div className={styles["conteiner"]}>
                <div>
                  <h1>{subject.title}</h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}
