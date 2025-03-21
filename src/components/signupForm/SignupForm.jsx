'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/store/slices/userSlice';
import { authApi } from '@/lib/api/auth';
import { Snackbar, Alert } from '@mui/material';

import '@/styles/components/authorize.scss';

const SignupForm = ({ onClose }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const validate = (name, email, password, confirmPassword) => {
    let errorMessage = '';

    if (name.length > 20) {
      errorMessage += 'Имя не должно превышать 20 символов.\n';
    }

    if (!email.includes('@')) {
      errorMessage += 'Некорректный email.\n';
    }

    if (password.length < 5) {
      errorMessage += 'Пароль должен содержать минимум 5 символов.\n';
    }

    if (password.length > 30) {
      errorMessage += 'Пароль не должен превышать 30 символов.\n';
    }

    if (password !== confirmPassword) {
      errorMessage += 'Пароли не совпадают.\n';
    }

    if (errorMessage) {
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');

    if (!validate(name, email, password, confirmPassword)) {
      return;
    }

    try {
      const response = await authApi.register({ name, email, password });
      dispatch(loginSuccess(email));
      setSnackbarMessage(response.data.message);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      router.push('/main');
    } catch (error) {
      setSnackbarMessage(
        error.response?.data?.error || 'Ошибка при регистрации'
      );
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="modal-overview">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <img src="/assets/icons/cross.svg" alt="Закрыть" />
        </button>
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Имя</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Введите ваше имя"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
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
          <div className="form-group">
            <label htmlFor="confirm-password">Подтвердите пароль</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Подтвердите ваш пароль"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Зарегистрироваться
          </button>
        </form>
      </div>

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
    </div>
  );
};

export default SignupForm;
