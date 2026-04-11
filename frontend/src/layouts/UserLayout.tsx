import React from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/user.css';

const UserLayout: React.FC = () => {
  return (
    <div className="user-body">
      <header>
        <div className="nav-container">
          <img src="/img/logo.png" alt="FutBrain Logo" id="logo" />
          <nav>
            <ul className="nav-links">
              <li><a href="/" className="active">Начало</a></li>
              <li><a href="/admin">Админ панел</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <div className="footer-bottom">
          &copy; 2026 FutBrain. Всички права запазени.
        </div>
      </footer>
    </div>
  );
};

export default UserLayout;
