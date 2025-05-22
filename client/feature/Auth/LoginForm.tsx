import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAdmin, registerUser } from '@/lib/store/features/authSlice';
import { Button } from '@heroui/button';
import styles from '@/pages/Home.module.css';

interface LoginFormProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onSwitchToRegister }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [classGroup, setClassGroup] = useState('5');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isAdmin) {
        if (!name || !password) {
          setError('Пожалуйста, заполните все поля');
          return;
        }
        
        // @ts-ignore
        const result = await dispatch(loginAdmin({ name, password })).unwrap();
        if (result) {
          onClose();
        }
      } else {
        if (!name || !classGroup) {
          setError('Пожалуйста, заполните все поля');
          return;
        }
        
        // @ts-ignore
        const result = await dispatch(registerUser({ name, class: classGroup })).unwrap();
        if (result) {
          onClose();
        }
      }
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка при входе');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">
          {isAdmin ? 'Вход для администратора' : 'Вход для ученика'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {isAdmin ? 'Логин:' : 'ФИО:'}
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          {isAdmin ? (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Пароль:</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          ) : (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Класс:</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={classGroup}
                onChange={(e) => setClassGroup(e.target.value)}
                required
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
          )}
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
              />
              <span className="text-sm">Я администратор</span>
            </label>
          </div>
          
          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          <div className="flex justify-between items-center">
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Войти
            </Button>
            
            <button
              type="button"
              className="text-sm text-blue-500 hover:underline"
              onClick={onSwitchToRegister}
            >
              Регистрация
            </button>
          </div>
        </form>
        
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default LoginForm;