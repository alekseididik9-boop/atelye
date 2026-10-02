import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

// Перехватчик ЗАПРОСОВ (прикрепляет access-токен ко всем запросам)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Перехватчик ОТВЕТОВ (ловит просроченный токен и обновляет его)
api.interceptors.response.use(
    (response) => response, // Если всё ок, просто пропускаем
    async (error) => {
        const originalRequest = error.config;
        
        // Если сервер вернул 401 (Не авторизован) и мы еще не пытались обновить токен
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Ставим флаг, чтобы не зациклиться
            const refreshToken = localStorage.getItem('refresh_token');
            
            if (refreshToken) {
                try {
                    // Идем к Django за новым access-токеном
                    const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                        refresh: refreshToken
                    });
                    
                    // Сохраняем новый токен
                    localStorage.setItem('access_token', response.data.access);
                    
                    // Обновляем заголовок в оригинальном запросе и повторяем его!
                    originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    // Если даже refresh-токен протух (прошло 24 часа) — выкидываем на логин
                    console.error('Refresh токен истек', refreshError);
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;