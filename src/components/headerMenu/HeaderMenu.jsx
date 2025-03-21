'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUserName } from '@/store/slices/userSlice';
import { userApi } from '@/lib/api/user';

import '@/styles/components/headerMenu.scss';

const HeaderMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);
  const userName = useSelector((state) => state.user.name);

  useEffect(() => {
    if (!email || userName) return;

    const fetchUserName = async () => {
      try {
        const response = await userApi.getName({ params: { email } });
        dispatch(setUserName(response.data.name));
      } catch (error) {
        console.error(
          'Ошибка при получении имени пользователя:',
          error.response?.data || error
        );
      }
    };

    fetchUserName();
  }, [email, userName, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/');
  };

  return (
    <header className="header">
      <div className="logo">Task Manager</div>
      <div className="user-info">
        <span>{userName || 'Загрузка...'}</span>
        <button onClick={handleLogout} className="logout-button">
          Выход
        </button>
      </div>
    </header>
  );
};

export default HeaderMenu;
