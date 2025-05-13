"use client";

import styles from "./Questions.module.css";

import DefaultLayout from "@/layouts/default";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function IndexPage() {
  const searchParams = useSearchParams();

  const search = searchParams.get("subject");

  console.log(search);

  return (
    <DefaultLayout>
      <section className={styles.conteiner}>
        <Link href={`/questions/1`}>one</Link>
      </section>
    </DefaultLayout>
  );
}
