import React from 'react';

const Posts: React.FC = () => {
  return (
    <>
      <title>Публикации – FutBrain</title>
      <section className="section-header section-header-no-border mb-0">
        <h1>Всички публикации</h1>
      </section>

      <div className="search-box search-box-full">
        <input type="text" placeholder="Търси по ключова дума, играч или отбор..." />
        <button type="submit"><i className="fas fa-search"></i></button>
      </div>

      <div className="filters">
        <button className="filter-btn active">Всички</button>
        <button className="filter-btn">Най-нови</button>
        <button className="filter-btn">Най-харесвани</button>
        <button className="filter-btn">Най-коментирани</button>
        <button className="filter-btn">Анализи</button>
      </div>

      <div className="posts-grid">
        <article className="post-card">
          <div className="post-header">
            <img src="/img/logo.png" alt="Потребител" className="user-avatar" />
            <span className="user-name">SoccerFan99</span>
            <span className="post-date">преди 2 часа</span>
          </div>
          <div className="post-body">
            <h3>Кой ще спечели Златната обувка този сезон?</h3>
            <p>С преминаването на Мбапе в Реал Мадрид състезанието за Златната обувка в Ла Лига ще бъде оспорвано...</p>
          </div>
          <div className="post-footer">
            <span><i className="far fa-thumbs-up"></i> 124 харесвания</span>
            <span><i className="far fa-comment"></i> 45 коментара</span>
          </div>
          
          <button className="btn-toggle-comments">Виж коментарите (2)</button>
          
          <div className="comments-section active">
            <div className="comment-item">
              <span className="comment-user">GoalHunter</span>
              <p className="comment-text">Мисля, че Холанд ще го бие по голове отново, въпреки че Мбапе е фаворит.</p>
              <div className="comment-actions">
                <button className="btn-reply">Отговори</button>
              </div>
              
              <div className="replies-container">
                <div className="reply-item">
                  <span className="comment-user">SoccerFan99</span>
                  <p className="comment-text">Трудно е да се каже, Холанд има по-добри подавачи зад себе си.</p>
                </div>
              </div>
            </div>

            <div className="comment-item">
              <span className="comment-user">TacticsMaster</span>
              <p className="comment-text">Всичко зависи от това как Анчелоти ще ги подреди.</p>
              <div className="comment-actions">
                <button className="btn-reply">Отговори</button>
              </div>
            </div>

            <form className="add-comment-form">
              <input type="text" placeholder="Напиши коментар..." />
              <button type="submit" className="btn-send"><i className="fas fa-paper-plane"></i></button>
            </form>
          </div>
        </article>

        <article className="post-card">
          <div className="post-header">
            <img src="/img/logo.png" alt="Потребител" className="user-avatar" />
            <span className="user-name">TacticsMaster</span>
            <span className="post-date">преди 5 часа</span>
          </div>
          <div className="post-body">
            <h3>Анализ на тактиката на Шаби Алонсо в Леверкузен</h3>
            <p>Начинът, по който използват крайните си защитници, е революционен. Нека разгледаме формацията 3-4-2-1...</p>
          </div>
          <div className="post-footer">
            <span><i className="far fa-thumbs-up"></i> 89 харесвания</span>
            <span><i className="far fa-comment"></i> 12 коментара</span>
          </div>
          
          <button className="btn-toggle-comments">Виж коментарите (12)</button>
        </article>
      </div>
    </>
  );
};

export default Posts;
