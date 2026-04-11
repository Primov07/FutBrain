import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminPlayerAdd from './pages/AdminPlayerAdd';
import AdminUsers from './pages/AdminUsers';
import AdminPosts from './pages/AdminPosts';
import AdminPlayers from './pages/AdminPlayers';
import AdminPlayerUpdate from './pages/AdminPlayerUpdate';
import AdminComments from './pages/AdminComments';
import AdminReplies from './pages/AdminReplies';
import AdminAccessories from './pages/AdminAccessories';

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={
          <div className="hero">
            <div className="hero-content">
              <h1>FutBrain Начало</h1>
              <p>Добре дошли в нашия футболен свят!</p>
              <a href="/admin" className="btn-register">Към Админ панела</a>
            </div>
          </div>
        } />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="posts" element={<AdminPosts />} />
        <Route path="players" element={<AdminPlayers />} />
        <Route path="players/add" element={<AdminPlayerAdd />} />
        <Route path="players/update/:id" element={<AdminPlayerUpdate />} />
        <Route path="comments" element={<AdminComments />} />
        <Route path="replies" element={<AdminReplies />} />
        <Route path="accessories" element={<AdminAccessories />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
