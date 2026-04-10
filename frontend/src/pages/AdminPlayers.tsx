import React from 'react';
import { Link } from 'react-router-dom';

const AdminPlayers: React.FC = () => {
  return (
    <section className="data-section">
      <div className="section-header">
        <h2>База данни с играчи</h2>
        <div className="header-actions">
          <button className="btn-refresh" title="Обнови таблицата"><i className="fas fa-sync-alt"></i></button>
          <Link to="/admin/players/add" className="btn-add">
            <i className="fas fa-plus"></i> Добави нов играч
          </Link>
        </div>
      </div>
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Снимка</th>
              <th>Име</th>
              <th>Клуб</th>
              <th>Лого на клуб</th>
              <th>Последователи</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><img src="/img/logo.png" alt="Player" className="table-img" /></td>
              <td>Ерлинг Холанд</td>
              <td>Манчестър Сити</td>
              <td><img src="/img/logo.png" alt="Club" className="table-img" style={{ width: '30px', height: '30px' }} /></td>
              <td>12 500</td>
              <td className="actions">
                <button className="btn-edit" title="Редактирай"><i className="fas fa-edit"></i></button>
                <button className="btn-delete" title="Изтрий"><i className="fas fa-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminPlayers;
