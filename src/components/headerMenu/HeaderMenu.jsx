import React from 'react';

import '@/styles/components/headerMenu.scss';

const HeaderMenu = ({ onLogout }) => {
  return (
    <header className="header">
      <div className="logo">Task Manager</div>
      <div className="user-info">
        <span>Коноплич Андрей</span>
        <button onClick={onLogout} className="logout-button">
          Выход
        </button>
      </div>
    </header>
  );
};

export default HeaderMenu;
