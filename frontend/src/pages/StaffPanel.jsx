import { useState, useEffect } from 'react';
import api from '../api/api';
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
                                
                                {/* Верхняя часть: Номер и статус */}
                                <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between border-bottom pb-3 mb-4" style={{ borderColor: '#443a35' }}>
                                    <h4 className="serif-font text-gold mb-3 mb-md-0">Заказ #{order.id}</h4>
                                    
                                    <div className="d-flex align-items-center">
                                        <span className="text-white-50 small text-uppercase me-3">Статус:</span>
                                        <select 
                                            className="form-select bg-dark text-white"
                                            style={{ width: '200px', borderColor: '#443a35', cursor: 'pointer' }}
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        >
                                            <option value="NEW">Новый</option>
                                            <option value="IN_PROGRESS">В работе</option>
                                            <option value="FITTING">На примерке</option>
                                            <option value="READY">Готов</option>
                                            <option value="COMPLETED">Выдан клиенту</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Нижняя часть: 2 колонки (Клиент и Детали) */}
                                <div className="row">
                                    
                                    {/* Левая колонка: Данные клиента */}
                                    <div className="col-md-5 mb-4 mb-md-0 border-md-end" style={{ borderColor: '#443a35' }}>
                                        <h6 className="text-white-50 mb-3" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Данные клиента</h6>
                                        <p className="mb-2"><span className="text-white-50">👤 Имя: </span><strong className="text-white ms-1">{order.client_name || 'Не указано'}</strong></p>
                                        <p className="mb-2"><span className="text-white-50">📞 Тел: </span><strong className="text-white ms-1">{order.client_phone}</strong></p>
                                        <p className="mb-0"><span className="text-white-50">✉️ Email: </span><strong className="text-white ms-1">{order.client_email || 'Не указан'}</strong></p>
                                    </div>
                                    
                                    {/* Правая колонка: Детали заказа */}
                                    <div className="col-md-7 ps-md-4">
                                        <h6 className="text-white-50 mb-3" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Детали пошива</h6>
                                        
                                        {/* ВЫВОДИМ НОВЫЕ ТЕКСТОВЫЕ ПОЛЯ ИЗ БЭКЕНДА */}
                                        <p className="mb-2">
                                            <span className="text-white-50">✂️ Услуга: </span>
                                            <strong className="text-white ms-1">{order.service_name || `ID ${order.service}`}</strong>
                                        </p>
                                        <p className="mb-2">
                                            <span className="text-white-50">🧵 Ткань: </span>
                                            <strong className="text-white ms-1">{order.fabric_name || `ID ${order.fabric}`}</strong>
                                        </p>
                                        
                                        <div className="d-flex align-items-start mt-3 p-3 rounded" style={{ backgroundColor: '#201b19' }}>
                                            <span className="text-white-50 me-2" style={{ whiteSpace: 'nowrap' }}>📏 Мерки:</span>
                                            <strong className="text-gold" style={{ wordBreak: 'break-word' }}>
                                                {order.measurement_details || order.measurement || 'Мерки не прикреплены'}
                                            </strong>
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