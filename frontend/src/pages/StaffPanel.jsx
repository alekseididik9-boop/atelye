import { useState, useEffect } from 'react';
import api from '../api/api';

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
            alert('Статус заказа успешно обновлен!');
            fetchOrders(); 
        } catch (error) {
            console.error("Ошибка при обновлении статуса:", error);
            // Просим React показать точный ответ от базы данных
            if (error.response && error.response.data) {
                alert('Ответ от сервера: ' + JSON.stringify(error.response.data));
            } else {
                alert('Ошибка обновления. Проверьте консоль.');
            }
        }
    };

    return (
        <div className="mt-4">
            <div className="text-center mb-5 border-bottom pb-4" style={{ borderColor: '#443a35 !important' }}>
                <p className="text-uppercase text-gold mb-2" style={{ letterSpacing: '2px', fontSize: '0.9rem' }}>Рабочая зона</p>
                <h1 className="display-5 text-white serif-font mb-2">Управление заказами</h1>
            </div>

            <div className="row justify-content-center">
                {orders.length === 0 ? (
                    <p className="text-center text-white-50">Заказов пока нет.</p>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="col-12 mb-4">
                            <div className="card premium-card p-3 d-flex flex-row align-items-center justify-content-between">
                                <div>
                                    <h4 className="serif-font text-gold mb-1">Заказ #{order.id}</h4>
                                    <p className="text-white-50 mb-0" style={{ fontSize: '0.9rem' }}>
                                        Услуга ID: {order.service} | Ткань ID: {order.fabric}
                                    </p>
                                </div>
                                
                                <div className="d-flex align-items-center gap-3">
                                    <span className="text-white-50 small text-uppercase">Статус:</span>
                                    <select 
                                        className="form-select bg-dark text-white border-secondary"
                                        style={{ width: '200px' }}
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
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default StaffPanel;