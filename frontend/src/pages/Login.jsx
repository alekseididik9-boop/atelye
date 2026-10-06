import { useState } from 'react';
import api from '../api/api';
import Swal from 'sweetalert2'; 

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); 
        try {
            const response = await api.post('login/', { username, password });
            
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            localStorage.setItem('is_staff', response.data.is_staff); 
            
            // Красивое окно вместо alert()
            // await заставит код подождать, пока пользователь нажмет "OK", прежде чем перезагружать страницу
            await Swal.fire({
                title: 'Добро пожаловать!',
                text: 'Вы успешно вошли в систему.',
                icon: 'success',
                background: '#201b19', 
                color: '#fff',         
                confirmButtonColor: '#d4af37', 
                confirmButtonText: 'Продолжить'
            });
            
            window.location.href = '/';
        } catch (error) {
            // Окно для ошибки
            Swal.fire({
                title: 'Ошибка входа',
                text: 'Проверьте правильность логина и пароля.',
                icon: 'error',
                background: '#201b19',
                color: '#fff',
                confirmButtonColor: '#d4af37'
            });
            console.error("Ошибка авторизации:", error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '300px', margin: '0 auto' }}>
            <h2 className="text-white mb-4 text-center">Вход в систему</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                    type="text" 
                    placeholder="Логин (Телефон)" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #443a35', backgroundColor: '#2b2522', color: 'white' }}
                />
                <input 
                    type="password" 
                    placeholder="Пароль" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #443a35', backgroundColor: '#2b2522', color: 'white' }}
                />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#d4af37', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Войти
                </button>
            </form>
        </div>
    );
}

export default Login;