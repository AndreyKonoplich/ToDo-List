import React from 'react';
import Link from 'next/link';

import '@/styles/components/authorize.scss';

const SignupForm = ({ onClose }) => {
  return (
    <div className="modal-overview">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <img src="/assets/icons/cross.svg" alt="Закрыть" />
        </button>
        <h2>Регистрация</h2>
        <form>
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
          <Link href="/main">
            <button type="submit" className="submit-button">
              Зарегистрироваться
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
