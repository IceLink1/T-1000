import axios from 'axios';
import { Middleware } from '@reduxjs/toolkit';

// Базовый URL API
const API_URL = 'http://localhost:5000';

// Создаем экземпляр axios с базовым URL
export const api = axios.create({
  baseURL: API_URL,
});

// Middleware для автоматического добавления токена к запросам
export const authMiddleware: Middleware = (store) => (next) => (action) => {
  // Добавляем токен к каждому запросу, если он есть в localStorage
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Обрабатываем ответы от сервера
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Если сервер вернул ошибку 401 (Unauthorized), выполняем выход из системы
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        store.dispatch({ type: 'auth/logout' });
      }
      return Promise.reject(error);
    }
  );

  return next(action);
};

// Функция для проверки наличия токена и его валидности
export const checkAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  // Здесь можно добавить проверку срока действия токена, если он хранится в формате JWT
  // Например, можно декодировать токен и проверить поле exp
  
  return true;
};

// Функция для получения роли пользователя из токена
export const getUserRole = () => {
  const user = localStorage.getItem('user');
  if (!user) return null;
  
  try {
    const userData = JSON.parse(user);
    return userData.role;
  } catch (error) {
    console.error('Ошибка при получении роли пользователя:', error);
    return null;
  }
};

// Функция для проверки, является ли пользователь администратором
export const isAdmin = () => {
  return getUserRole() === 'ADMIN';
};