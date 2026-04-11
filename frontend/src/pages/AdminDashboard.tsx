import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <>
      <h1>Общ преглед на системата</h1>
      <p className="admin-welcome-text">
        Добре дошли в административния панел на FutBrain. Тук можете да управлявате всички аспекти на платформата.
      </p>

      {/* Статистика */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-user-friends"></i></div>
          <div className="stat-info">
            <h3>1 245</h3>
            <p>Общо потребители</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-paper-plane"></i></div>
          <div className="stat-info">
            <h3>856</h3>
            <p>Публикации</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-futbol"></i></div>
          <div className="stat-info">
            <h3>120</h3>
            <p>Играчи</p>
          </div>
        </div>
        <div className="stat-card warning">
          <div className="stat-icon"><i className="fas fa-exclamation-triangle"></i></div>
          <div className="stat-info">
            <h3>12</h3>
            <p>Чакащи доклади</p>
          </div>
        </div>
      </section>

      <div className="data-section">
        <div className="section-header">
          <h2>Бързи връзки</h2>
        </div>
        <div className="stats-grid">
          <Link to="/admin/players/add" className="stat-card stat-link">
            <div className="stat-icon stat-icon-bg">
              <i className="fas fa-user-plus"></i>
            </div>
            <div className="stat-info">
              <h3>Добави играч</h3>
              <p>Създаване на нов профил</p>
            </div>
          </Link>
          <Link to="/admin/posts" className="stat-card stat-link">
            <div className="stat-icon stat-icon-bg">
              <i className="fas fa-edit"></i>
            </div>
            <div className="stat-info">
              <h3>Преглед публикации</h3>
              <p>Управление на съдържание</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
