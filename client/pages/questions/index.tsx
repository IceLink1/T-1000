"use client";

import styles from "./Questions.module.css";

import DefaultLayout from "@/layouts/default";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function IndexPage() {
  const searchParams = useSearchParams();

  const subject = searchParams.get("subject");

  const questions = [1, 2, 3, 4, 5, 6];

  return (
    <DefaultLayout>
      <section className={styles["main"]}>
        <div className={styles["container"]}>
          <h1>{subject}</h1>
          {questions.map((question) => (
            <Link href={`/questions/1`}>
              <div className={styles["card"]}>afwofahwdiawudh</div>
            </Link>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}
