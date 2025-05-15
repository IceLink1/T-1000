"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import styles from "./auth.module.css";
import { Button } from "@heroui/button";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export default function Auth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [Class, setClass] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAdminCheck, setIsAdminCheck] = useState<boolean>(false);

  useEffect(() => {
    const isAuth = localStorage.getItem("token");
    if (isAuth) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "admin" && password === "password") {
      setIsLoggedIn(true);
      localStorage.setItem("adminAuth", "true");
      setLoginError("");
    } else {
      setLoginError("Неверный логин или пароль");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };
  console.log(Class);

  return (
    <>
      <Button
        className="text-sm font-normal text-default-600 bg-default-100"
        // startContent={<HeartFilledIcon className="text-danger" />}
        variant="flat"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Login
      </Button>

      {isOpen && (
        <div className={styles["authPopup"]} onClick={() => setIsOpen(false)}>
          <div
            className={`bg-white ${styles.card} dark:bg-black`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.cardHeader}>
              <h2 className={styles.title}>Вход в панель администратора</h2>
            </div>
            <div className={styles.cardBody}>
              <form onSubmit={handleLogin}>
                {isAdminCheck ? (
                  <>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Логин:</label>
                      <input
                        type="text"
                        className={styles.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Пароль:</label>
                      <input
                        type="password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>ФИО:</label>
                      <input
                        type="sting"
                        className={styles.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Класс:</label>
                      <select
                        className="form-control w-full p-3  border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        onChange={(e) => setClass(e.target.value)}
                        value={Class}
                      >
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                      </select>
                    </div>
                  </>
                )}
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    <input
                      type="checkbox"
                      className={`mr-8`}
                      checked={isAdminCheck}
                      onChange={(e) => setIsAdminCheck((prev) => !prev)}
                    />
                    <span> Я администратор</span>
                  </label>
                </div>
                {loginError && <p className={styles.error}>{loginError}</p>}
                <div className={styles.cardFooter}>
                  <button type="submit" className={styles.button}>
                    Войти
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
