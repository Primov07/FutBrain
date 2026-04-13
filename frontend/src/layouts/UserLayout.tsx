import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import '../styles/user.css';

const UserLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="user-body">
      <header>
        <div className="nav-container">
          <Link id="home" to="/">
            <img id="logo" src="/img/logo.png" alt="FutBrain лого" />
          </Link>
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/posts" className={location.pathname === '/posts' ? 'active' : ''}>
                  Публикации
                </Link>
              </li>
              <li>
                <Link to="/game" className={location.pathname === '/game' ? 'active' : ''}>
                  Игра
                </Link>
              </li>
              <li>
                <Link to="/store" className={location.pathname === '/store' ? 'active' : ''}>
                  Магазин
                </Link>
              </li>
              <li>
                <Link to="/rankings" className={location.pathname === '/rankings' ? 'active' : ''}>
                  Класации
                </Link>
              </li>
              <li>
                <Link to="/contacts" className={location.pathname === '/contacts' ? 'active' : ''}>
                  Контакти
                </Link>
              </li>
            </ul>
          </nav>
          <div className="auth-buttons">
            <Link to="/login" className="btn-login">Вход</Link>
            <Link to="/register" className="btn-register">Регистрация</Link>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/img/logo.png" alt="FutBrain лого" />
            <p>Твоята футболна общност.</p>
          </div>
          <div className="footer-links">
            <h4>Бързи връзки</h4>
            <ul>
              <li><Link to="/">Начало</Link></li>
              <li><Link to="/posts">Публикации</Link></li>
              <li><Link to="/game">Игра</Link></li>
              <li><Link to="/rankings">Класации</Link></li>
            </ul>
          </div>
          <div className="footer-about">
            <h4>За нас</h4>
            <p>Обсъждай любимите си отбори и играчи и участвай в седмичните ни игри за награди.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 FutBrain. Всички права запазени.</p>
        </div>
      </footer>
    </div>
  );
};

export default UserLayout;
