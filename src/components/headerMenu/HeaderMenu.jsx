'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/userSlice';
import { userApi } from '@/lib/api/user';

import '@/styles/components/headerMenu.scss';

const HeaderMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await userApi.getName(email);
        setUserName(response.data.name);
      } catch (error) {
        console.error('Ошибка при получении имени пользователя:', error);
      }
    };
    fetchUserName();
  }, [email]);

  const handleLogout = async () => {
    try {
      dispatch(logout());
      router.replace('/');
    } catch (error) {
      alert('Ошибка при выходе');
    }
  };

  return (
    <header className="header">
      <div className="logo">Task Manager</div>
      <div className="user-info">
        <span>{userName}</span>
        <button onClick={handleLogout} className="logout-button">
          Выход
        </button>
      </div>
    </header>
  );
};

export default HeaderMenu;
