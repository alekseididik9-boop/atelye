import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Catalog from './pages/Catalog';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import CreateOrder from './pages/CreateOrder';
import StaffPanel from './pages/StaffPanel';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100 bg-dark text-white">
        {/* Строгое темное меню */}
        <nav className="navbar navbar-expand-lg bg-dark-premium py-3 mb-0 border-bottom" style={{ borderColor: '#443a35' }}>
          <div className="container">
            <Link className="navbar-brand serif-font fs-3 text-white d-flex align-items-center" to="/">
              <span className="text-gold me-2">♕</span> ATELIER
            </Link>
            
            <div className="navbar-nav ms-auto gap-4 align-items-center">
              <Link className="nav-link" to="/">Каталог</Link>
              <Link className="nav-link text-gold" to="/staff">Панель мастера</Link>
              <Link className="nav-link" to="/login">Вход</Link>
              <Link className="nav-link" to="/register">Регистрация</Link>
              <Link className="nav-link" to="/profile">Профиль</Link>
              <Link className="btn-gold text-decoration-none ms-3 px-3 py-2" to="/order">Заказать костюм</Link>
            </div>
          </div>
        </nav>

        {/* Основной контент с роутерами */}
        <div className="container pb-5 pt-5 flex-grow-1">
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/order" element={<CreateOrder />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/staff" element={<StaffPanel />} />
          </Routes>
        </div>

        {/* Премиальный футер с адресом и контактами */}
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
                <p className="mb-1">✉️ info@korona-atelier.ru</p>
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