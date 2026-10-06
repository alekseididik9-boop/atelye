import { useState, useEffect } from 'react';
import api from '../api/api';
// Импортируем библиотеку для красивых уведомлений
import Swal from 'sweetalert2';

function StaffPanel() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = () => {
        api.get('orders/').then((res) => setOrders(res.data)).catch(console.error);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await api.patch(`orders/${orderId}/`, { status: newStatus });
            
            // Красивое мини-уведомление (toast) вместо alert
            Swal.fire({
                title: 'Статус обновлен!',
                text: 'Уведомление отправлено клиенту.',
                icon: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                background: '#201b19',
                color: '#fff',
            });
            
            fetchOrders(); 
        } catch (error) {
            console.error("Ошибка при обновлении статуса:", error);
            
            // Красивое окно ошибки вместо alert
            let errorMessage = 'Ошибка обновления. Проверьте консоль.';
            if (error.response && error.response.data) {
                errorMessage = JSON.stringify(error.response.data);
            }

            Swal.fire({
                title: 'Ошибка',
                text: errorMessage,
                icon: 'error',
                background: '#201b19',
                color: '#fff',
                confirmButtonColor: '#d4af37'
            });
        }
    };

    return (
        <div className="mt-4">
            <div className="text-center mb-5 border-bottom pb-4" style={{ borderColor: '#443a35' }}>
                <p className="text-uppercase text-gold mb-2" style={{ letterSpacing: '2px', fontSize: '0.9rem' }}>Рабочая зона</p>
                <h1 className="display-5 text-white serif-font mb-2">Управление заказами</h1>
            </div>

            <div className="row justify-content-center">
                {orders.length === 0 ? (
                    <p className="text-center text-white-50">Заказов пока нет.</p>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="col-12 mb-4">
                            <div className="card premium-card p-4">
                                {/* Верхняя часть карточки (Заказ и Статус) */}
                                <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between border-bottom pb-3 mb-3" style={{ borderColor: '#443a35' }}>
                                    <div className="mb-3 mb-md-0">
                                        <h4 className="serif-font text-gold mb-1">Заказ #{order.id}</h4>
                                        <p className="text-white-50 mb-0" style={{ fontSize: '0.9rem' }}>
                                            Услуга ID: <span className="text-white">{order.service}</span> | Ткань ID: <span className="text-white">{order.fabric}</span>
                                        </p>
                                    </div>
                                    
                                    <div className="d-flex align-items-center gap-3">
                                        <span className="text-white-50 small text-uppercase">Статус:</span>
                                        <select 
                                            className="form-select bg-dark text-white"
                                            style={{ width: '200px', borderColor: '#443a35', cursor: 'pointer' }}
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        >
                                            <option value="NEW">Новый</option>
                                            <option value="IN_PROGRESS">В работе</option>
                                            <option value="READY">Готов</option>
                                            <option value="COMPLETED">Выдан клиенту</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Нижняя часть карточки (Данные клиента) */}
                                <div>
                                    <h6 className="text-white-50 mb-3" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Данные клиента</h6>
                                    <div className="row">
                                        <div className="col-md-4 mb-2 mb-md-0">
                                            <span className="text-white-50">👤 Имя: </span>
                                            <strong className="text-white">{order.client_name || 'Не указано'}</strong>
                                        </div>
                                        <div className="col-md-4 mb-2 mb-md-0">
                                            <span className="text-white-50">📞 Телефон: </span>
                                            <strong className="text-white">{order.client_phone}</strong>
                                        </div>
                                        <div className="col-md-4">
                                            <span className="text-white-50">✉️ Email: </span>
                                            <strong className="text-white">{order.client_email || 'Не указан'}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default StaffPanel;