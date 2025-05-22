"use client";

import { Head } from "./head";

import { Navbar } from "@/components/navbar";
import { getUserData } from "@/lib/store/features/authSlice";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks/useStore";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserData());
  });

  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      <Navbar />
      <main className="container mx-auto max-w-7xl">{children}</main>
    </div>
  );
}
