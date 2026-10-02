import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Останавливаем перезагрузку страницы при отправке формы
        try {
            // Отправляем логин и пароль на бэкенд
            const response = await api.post('login/', { username, password });
            
            // Если всё верно, Django вернет токен. Сохраняем его в память браузера!
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            alert('Вы успешно вошли в систему!');
            
            // Перенаправляем пользователя обратно в каталог
            navigate('/');
        } catch (error) {
            alert('Ошибка входа. Проверьте логин и пароль.');
            console.error("Ошибка авторизации:", error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '300px', margin: '0 auto' }}>
            <h2>Вход в систему</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                    type="text" 
                    placeholder="Логин (Телефон)" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <input 
                    type="password" 
                    placeholder="Пароль" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Войти
                </button>
            </form>
        </div>
    );
}

export default Login;