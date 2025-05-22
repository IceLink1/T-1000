import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '@/lib/store/features/authSlice';
import { Button } from '@heroui/button';

interface RegisterFormProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onClose, onSwitchToLogin }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [classGroup, setClassGroup] = useState('5');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (!name || !classGroup) {
        setError('Пожалуйста, заполните все поля');
        return;
      }
      
      // @ts-ignore
      const result = await dispatch(registerUser({ name, class: classGroup })).unwrap();
      if (result) {
        setSuccess('Регистрация успешна!');
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка при регистрации');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Регистрация нового ученика</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">ФИО:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
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
          
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          
          <div className="flex justify-between items-center">
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Зарегистрироваться
            </Button>
            
            <button
              type="button"
              className="text-sm text-blue-500 hover:underline"
              onClick={onSwitchToLogin}
            >
              Уже есть аккаунт? Войти
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

export default RegisterForm;