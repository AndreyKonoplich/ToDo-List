import React from 'react';

import '@/styles/components/headerMenu.scss';

const HeaderMenu = ({ username, onLogout }) => {
  return (
    <header className="header">
      <div className="logo">Task Manager</div>
      <div className="user-info">
        <span>{username}</span>
        <button onClick={onLogout} className="logout-button">
          Выход
        </button>
      </div>
    </header>
  );
};

export default HeaderMenu;
