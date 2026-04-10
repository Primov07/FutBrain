import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminPlayerAdd from './pages/AdminPlayerAdd';
import AdminUsers from './pages/AdminUsers';
import AdminPosts from './pages/AdminPosts';
import AdminPlayers from './pages/AdminPlayers';
import AdminComments from './pages/AdminComments';
import AdminReplies from './pages/AdminReplies';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <div style={{ padding: '50px', textAlign: 'center', color: 'white' }}>
          <h1>FutBrain Начало</h1>
          <p>Добре дошли в нашия футболен свят!</p>
          <a href="/admin" style={{ color: '#90EE90' }}>Към Админ панела</a>
        </div>
      } />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="posts" element={<AdminPosts />} />
        <Route path="players" element={<AdminPlayers />} />
        <Route path="players/add" element={<AdminPlayerAdd />} />
        <Route path="comments" element={<AdminComments />} />
        <Route path="replies" element={<AdminReplies />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
