'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUserName } from '@/store/slices/userSlice';
import { userApi } from '@/lib/api/user';
import { Snackbar, Alert } from '@mui/material';

import '@/styles/components/headerMenu.scss';

const HeaderMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);
  const userName = useSelector((state) => state.user.name);
  const [isLoading, setIsLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (!email) {
      setIsLoading(false);
      return;
    }

    const fetchUserName = async () => {
      try {
        const response = await userApi.getName({ params: { email } });
        dispatch(setUserName(response.data.name));
      } catch (error) {
        console.error(
          'Ошибка при получении имени пользователя:',
          error.response?.data || error
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserName();
  }, [email, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    setOpenSnackbar(true);
    setTimeout(() => {
      router.replace('/');
    }, 500);
  };

  useEffect(() => {
    if (userName) {
      setIsLoading(false);
    }
  }, [userName]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <header className="header">
      <div className="logo">Task Manager</div>
      <div className="user-info">
        <span>
          {isLoading ? 'Загрузка...' : userName || 'Неизвестный пользователь'}
        </span>
        <button onClick={handleLogout} className="logout-button">
          Выход
        </button>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            width: '100%',
            backgroundColor: '#5cb85c',
            color: '#fff',
            borderRadius: '5px',
          }}
        >
          Вы успешно вышли!
        </Alert>
      </Snackbar>
    </header>
  );
};

export default HeaderMenu;
