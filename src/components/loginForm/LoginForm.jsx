'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/store/slices/userSlice';
import { authApi } from '@/lib/api/auth';
import SignupForm from '@/components/signupForm/SignupForm';

import { Snackbar, Alert } from '@mui/material';

import '@/styles/components/authorize.scss';

const LoginForm = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const dispatch = useDispatch();
  const router = useRouter();

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openSignupModal = () => setIsSignupModalOpen(true);
  const closeSignupModal = () => setIsSignupModalOpen(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email').trim();
    const password = formData.get('password');

    if (!email || !password) {
      setSnackbarMessage('Заполните все поля');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await authApi.login({ email, password });
      dispatch(loginSuccess(email));
      setSnackbarMessage(response.data.message);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      router.push('/main');
    } catch (error) {
      setSnackbarMessage(error.response?.data?.error || 'Ошибка при входе');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <button className="primary-button" onClick={openLoginModal}>
        Приступить
      </button>

      {isLoginModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeLoginModal}>
              <img src="/assets/icons/cross.svg" alt="Закрыть" />
            </button>
            <h2>Вход</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Введите вашу почту"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Введите ваш пароль"
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Войти
              </button>
            </form>
            <p className="signup-link">
              Нет аккаунта?{' '}
              <button onClick={openSignupModal} className="signup-button">
                Зарегистрируйтесь
              </button>
            </p>
          </div>
        </div>
      )}

      {isSignupModalOpen && <SignupForm onClose={closeSignupModal} />}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginForm;
