import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import Swal from 'sweetalert2';

function CreateOrder() {
    const [services, setServices] = useState([]);
    const [fabrics, setFabrics] = useState([]);
    
    const [selectedService, setSelectedService] = useState('');
    const [selectedFabric, setSelectedFabric] = useState('');
    
    // Состояния для полей ручного ввода мерок
    const [chest, setChest] = useState('');
    const [waist, setWaist] = useState('');
    const [sleeveLength, setSleeveLength] = useState('');
    
    const navigate = useNavigate();

    useEffect(() => {
        api.get('services/').then((res) => setServices(res.data)).catch(console.error);
        api.get('fabrics/').then((res) => setFabrics(res.data)).catch(console.error);
        
        // Пытаемся подгрузить последние мерки клиента для автозаполнения
        api.get('measurements/').then((res) => {
            const data = res.data;
            if (data.length > 0) {
                const latest = data[data.length - 1];
                setChest(latest.chest);
                setWaist(latest.waist);
                setSleeveLength(latest.sleeve_length);
            }
        }).catch(console.error);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // ШАГ 1: Создаем новую запись с мерками в базе данных
            const measurementRes = await api.post('measurements/', {
                chest: chest,
                waist: waist,
                sleeve_length: sleeveLength
            });
            
            // Достаем ID только что созданной мерки из ответа сервера
            const newMeasurementId = measurementRes.data.id;

            // ШАГ 2: Создаем сам заказ, привязывая к нему этот новый ID
            await api.post('orders/', {
                service: selectedService,
                fabric: selectedFabric,
                measurement: newMeasurementId
            });
            
        await Swal.fire({
    title: 'Заказ принят!',
    text: 'Ваш заказ успешно оформлен. Мастер скоро свяжется с вами.',
    icon: 'success',
    background: '#201b19',
    color: '#fff',
    confirmButtonColor: '#d4af37',
    confirmButtonText: 'Отлично'
});    
            navigate('/profile');
        } catch (error) {
            if (error.response && error.response.data) {
                alert('Ответ от сервера: ' + JSON.stringify(error.response.data));
            } else {
                alert('Неизвестная ошибка при создании заказа.');
            }
            console.error("Детали ошибки:", error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Оформить заказ</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                <label>Выберите услугу:</label>
                <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} required style={{ padding: '10px', borderRadius: '5px' }}>
                    <option value="" disabled>-- Выберите из списка --</option>
                    {services.map(s => <option key={s.id} value={s.id}>{s.name} ({s.price} руб.)</option>)}
                </select>

                <label>Выберите ткань:</label>
                <select value={selectedFabric} onChange={(e) => setSelectedFabric(e.target.value)} required style={{ padding: '10px', borderRadius: '5px' }}>
                    <option value="" disabled>-- Выберите из списка --</option>
                    {fabrics.map(f => <option key={f.id} value={f.id}>{f.name} ({f.price} руб.)</option>)}
                </select>

                <label style={{ marginTop: '10px', fontWeight: 'bold' }}>Ваши параметры (можно изменить прямо сейчас):</label>
                <input type="number" placeholder="Обхват груди (см)" value={chest} onChange={(e) => setChest(e.target.value)} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                <input type="number" placeholder="Обхват талии (см)" value={waist} onChange={(e) => setWaist(e.target.value)} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                <input type="number" placeholder="Длина рукава (см)" value={sleeveLength} onChange={(e) => setSleeveLength(e.target.value)} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />

                <button type="submit" style={{ padding: '12px', backgroundColor: '#ffc107', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
                    Подтвердить заказ
                </button>
            </form>
        </div>
    );
}

export default CreateOrder;