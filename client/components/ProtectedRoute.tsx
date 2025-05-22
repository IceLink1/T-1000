import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const router = useRouter();
  const { user, token } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    // Если нет токена или пользователя, перенаправляем на главную страницу
    if (!token || !user) {
      router.push('/');
      return;
    }
    
    // Если требуется доступ только для администратора, проверяем роль
    if (adminOnly && user.role !== 'ADMIN') {
      router.push('/');
    }
  }, [token, user, adminOnly, router]);
  
  // Если нет токена или пользователя, или если требуется доступ администратора, но пользователь не админ, не рендерим содержимое
  if (!token || !user || (adminOnly && user.role !== 'ADMIN')) {
    return null;
  }
  
  // В противном случае рендерим содержимое
  return <>{children}</>;
};

export default ProtectedRoute;