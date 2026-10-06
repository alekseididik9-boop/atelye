import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import Swal from 'sweetalert2'; 

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // Добавляем новые состояния для Имени и Email
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault(); 
        try {
            // Отправляем новые поля на бэкенд вместе с логином и паролем
            // Важно: ключи first_name и email должны точно совпадать с названиями полей в Django
            await api.post('register/', { 
                username: username, 
                password: password,
                first_name: firstName,
                email: email
            });
            
            await Swal.fire({
                title: 'Регистрация успешна!',
                text: 'Теперь вы можете войти в систему, используя свои данные.',
                icon: 'success',
                background: '#201b19', 
                color: '#fff',         
                confirmButtonColor: '#d4af37', 
                confirmButtonText: 'Перейти ко входу'
            });
            
            navigate('/login');
        } catch (error) {
            Swal.fire({
                title: 'Ошибка регистрации',
                text: 'Пожалуйста, проверьте введенные данные. Возможно, такой логин уже занят.',
                icon: 'error',
                background: '#201b19',
                color: '#fff',
                confirmButtonColor: '#d4af37',
                confirmButtonText: 'Попробовать снова'
            });
            console.error("Ошибка регистрации:", error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '350px', margin: '0 auto' }}>
            <h2 className="text-white mb-4 text-center">Регистрация</h2>
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                
                <input 
                    type="text" 
                    placeholder="Ваше имя" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    required 
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #443a35', backgroundColor: '#2b2522', color: 'white' }}
                />

                <input 
                    type="text" 
                    placeholder="Логин (Телефон)" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #443a35', backgroundColor: '#2b2522', color: 'white' }}
                />

                
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
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
                
                <button type="submit" style={{ padding: '10px', backgroundColor: '#d4af37', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
}

export default Register;