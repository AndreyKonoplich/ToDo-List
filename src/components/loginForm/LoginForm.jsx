import React, { useState } from 'react';
import Link from 'next/link';
import '@/styles/components/loginForm.scss';

const LoginForm = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Вход</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">E-mail</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Введите вашу почту "
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Введите ваш пароль "
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Войти
          </button>
        </form>
        <p className="signup-link">
          Нет аккаунта? <Link href="/signup">Зарегистрируйтесь</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
