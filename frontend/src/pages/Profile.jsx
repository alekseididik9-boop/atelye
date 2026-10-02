import { useState, useEffect } from 'react';
import api from '../api/api';

function Profile() {
    const [orders, setOrders] = useState([]);
    const [measurements, setMeasurements] = useState([]);

    const [chest, setChest] = useState('');
    const [waist, setWaist] = useState('');
    const [sleeveLength, setSleeveLength] = useState('');
    
    // Новое состояние: храним ID мерок, если они уже есть в базе
    const [existingId, setExistingId] = useState(null); 

    const fetchData = () => {
        api.get('orders/').then((res) => setOrders(res.data)).catch(console.error);
        api.get('measurements/').then((res) => {
            const data = res.data;
            setMeasurements(data);
            
            // Если у клиента УЖЕ есть мерки, подставляем их в форму
            if (data.length > 0) {
                // Берем самые последние мерки из списка
                const latest = data[data.length - 1];
                setChest(latest.chest);
                setWaist(latest.waist);
                setSleeveLength(latest.sleeve_length);
                setExistingId(latest.id); // Запоминаем их ID для обновления
            }
        }).catch(console.error);
    };

    useEffect(() => {
        fetchData();
    }, []); 

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        window.location.href = '/';
    };

    const handleAddMeasurement = async (e) => {
        e.preventDefault();
        try {
            if (existingId) {
                // ОБНОВЛЯЕМ старые мерки (метод PATCH по ID)
                await api.patch(`measurements/${existingId}/`, {
                    chest: chest,
                    waist: waist,
                    sleeve_length: sleeveLength
                });
                alert('Мерки успешно обновлены!');
            } else {
                // СОЗДАЕМ новые (метод POST)
                await api.post('measurements/', {
                    chest: chest,
                    waist: waist,
                    sleeve_length: sleeveLength
                });
                alert('Мерки успешно сохранены!');
            }
            fetchData(); // Снова загружаем свежие данные с сервера
        } catch (error) {
            console.error("Ошибка при сохранении мерок:", error);
            alert('Ошибка! Проверьте, все ли поля заполнены корректно.');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Мой профиль</h2>
                <button onClick={handleLogout} style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Выйти из системы
                </button>
            </div>
            
            <hr style={{ margin: '20px 0' }} />

            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '300px' }}>
                    <h3>Мои мерки</h3>
                    {measurements.length === 0 ? (
                        <p>У вас пока нет сохраненных мерок.</p>
                    ) : (
                        <ul>
                            {measurements.map((m) => (
                                <li key={m.id} style={{ marginBottom: '5px' }}>
                                    Мерка #{m.id}: Грудь {m.chest} | Талия {m.waist} | Рукав {m.sleeve_length}
                                </li>
                            ))}
                        </ul>
                    )}

                    <h3 style={{ marginTop: '30px' }}>Мои заказы</h3>
                    {orders.length === 0 ? (
                        <p>У вас пока нет заказов.</p>
                    ) : (
                        <ul>
                            {orders.map((order) => (
                                <li key={order.id} style={{ marginBottom: '10px' }}>
                                    <strong>Заказ #{order.id}</strong> — Статус: {order.status}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div style={{ flex: '1', minWidth: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                    {/* Меняем заголовок в зависимости от того, есть ли уже мерки */}
                    <h3 style={{ marginTop: 0 }}>{existingId ? 'Обновить параметры' : 'Добавить новые мерки'}</h3>
                    <form onSubmit={handleAddMeasurement} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input type="number" placeholder="Обхват груди (см)" value={chest} onChange={(e) => setChest(e.target.value)} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                        <input type="number" placeholder="Обхват талии (см)" value={waist} onChange={(e) => setWaist(e.target.value)} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                        <input type="number" placeholder="Длина рукава (см)" value={sleeveLength} onChange={(e) => setSleeveLength(e.target.value)} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                        
                        {/* Меняем текст кнопки */}
                        <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                            {existingId ? 'Обновить мерки' : 'Сохранить мерки'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;