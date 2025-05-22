3import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { logout } from '@/lib/store/features/authSlice';
import { Button } from '@heroui/button';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useState } from 'react';

const Auth: React.FC = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  if (token && user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          {user.name} ({user.role === 'ADMIN' ? 'Админ' : 'Ученик'})
        </span>
        <Button
          size="sm"
          variant="flat"
          className="text-sm font-normal text-default-600 bg-default-100"
          onClick={handleLogout}
        >
          Выйти
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="flat"
        className="text-sm font-normal text-default-600 bg-default-100"
        onClick={openLoginModal}
      >
        Войти
      </Button>
      <Button
        size="sm"
        variant="flat"
        className="text-sm font-normal text-default-600 bg-default-100"
        onClick={openRegisterModal}
      >
        Регистрация
      </Button>

      {isLoginModalOpen && <LoginForm onClose={closeModals} onSwitchToRegister={openRegisterModal} />}
      {isRegisterModalOpen && <RegisterForm onClose={closeModals} onSwitchToLogin={openLoginModal} />}
    </div>
  );
};

export default Auth;