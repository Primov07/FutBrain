import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div className="auth-container">
      <title>Вход – FutBrain</title>
      <h2>Добре дошъл отново</h2>
      <p>Влез в профила си, за да обсъждаш любимите си теми.</p>
      
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="username">Потребителско име</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Парола</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className="auth-helper-links">
          <a href="#">Забравена парола?</a>
        </div>
        <button type="submit" className="btn-submit btn-full">Вход</button>
      </form>
      
      <div className="auth-footer">
        Нямаш профил? <Link to="/register">Регистрирай се тук</Link>
      </div>
    </div>
  );
};

export default Login;
