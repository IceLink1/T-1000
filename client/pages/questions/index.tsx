"use client";

import { useState } from "react";

import styles from "./Questions.module.css";

import DefaultLayout from "@/layouts/default";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function IndexPage() {
  const obj = useParams();
  console.log(obj);

  return (
    <DefaultLayout>
      <section className={styles.conteiner}>
        <Link href={`dawd/1`}>one</Link>
      </section>
    </DefaultLayout>
  );
}
