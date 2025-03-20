'use client';

import React, { useState } from 'react';
import SignupForm from '@/components/signupForm/SignupForm';
import Link from 'next/link';

import '@/styles/components/authorize.scss';

const LoginForm = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openSignupModal = () => setIsSignupModalOpen(true);
  const closeSignupModal = () => setIsSignupModalOpen(false);

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
            <form>
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
              <Link href="/main">
                <button type="submit" className="submit-button">
                  Войти
                </button>
              </Link>
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
    </>
  );
};

export default LoginForm;
