import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Catalog from './pages/Catalog';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import CreateOrder from './pages/CreateOrder';
import StaffPanel from './pages/StaffPanel';
import Contacts from './pages/Contacts';

function App() {
  // Проверяем статус мастера
  const [isStaff] = useState(() => {
    return localStorage.getItem('is_staff') === 'true';
  });

  // Проверяем, авторизован ли пользователь (есть ли токен)
  const [isAuthenticated] = useState(() => {
    return !!localStorage.getItem('access_token');
  });

  // Функция выхода из аккаунта
  const handleLogout = () => {
    // Очищаем локальное хранилище от всех данных пользователя
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('is_staff');
    
    // Перезагружаем страницу и кидаем на главную
    window.location.href = '/';
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100 bg-dark text-white">
        <nav className="navbar navbar-expand-lg bg-dark-premium py-3 mb-0 border-bottom" style={{ borderColor: '#443a35' }}>
          <div className="container">
            <Link className="navbar-brand serif-font fs-3 text-white d-flex align-items-center" to="/">
              <span className="text-gold me-2">♕</span> ATELIER
            </Link>
            
            <div className="navbar-nav ms-auto gap-4 align-items-center">
              <Link className="nav-link" to="/">Каталог</Link>
              <Link className="nav-link" to="/contacts">Контакты</Link>
              
              {isStaff && (
                <Link className="nav-link text-gold" to="/staff">Панель мастера</Link>
              )}

              {/* УСЛОВНЫЙ РЕНДЕРИНГ: Если НЕ авторизован */}
              {!isAuthenticated && (
                <>
                  <Link className="nav-link" to="/login">Вход</Link>
                  <Link className="nav-link" to="/register">Регистрация</Link>
                </>
              )}

              {/* УСЛОВНЫЙ РЕНДЕРИНГ: Если АВТОРИЗОВАН */}
              {isAuthenticated && (
                <>
                  <Link className="nav-link" to="/profile">Профиль</Link>
                  <button 
                    onClick={handleLogout} 
                    className="nav-link text-white-50" 
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    Выход
                  </button>
                </>
              )}

              <Link className="btn-gold text-decoration-none ms-3 px-3 py-2" to="/order">Заказать костюм</Link>
            </div>
          </div>
        </nav>

        <div className="container pb-5 pt-5 flex-grow-1">
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/order" element={<CreateOrder />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/staff" element={<StaffPanel />} />
          </Routes>
        </div>

        <footer className="py-4 border-top text-white-50 mt-auto" style={{ borderColor: '#443a35', backgroundColor: '#201b19', fontSize: '0.9rem' }}>
        
          <div className="container text-center text-md-start">
            <div className="row align-items-center">
              <div className="col-md-4 mb-3 mb-md-0">
                <h5 className="serif-font text-gold mb-1">Korona Atelier</h5>
                <p className="mb-0 small">Искусство индивидуального пошива.</p>
              </div>
              <div className="col-md-4 mb-3 mb-md-0 text-center">
                <p className="mb-1">📍 г. Москва, ул. Кольцевая, 15</p>
                <p className="mb-0">📞 +7 (495) 123-45-67</p>
              </div>
              <div className="col-md-4 text-md-end">
                <p className="mb-1">✉️ odin@korona-atelier.ru</p>
                <p className="mb-0 small text-white-50">© 2026 Все права защищены.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;