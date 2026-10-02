import { useState, useEffect } from 'react';
import api from '../api/api';

// Импортируем свои картинки из папки assets (названия могут быть любыми)
import troika from '../assets/troika.jpg';
import pidjak from '../assets/pidjak.jpg';
import bruki from '../assets/bruki.jpg';
import sherst from '../assets/sherst.jpg';
import lion from '../assets/lion.jpg';
import tvid from '../assets/tvid.jpg';

// Складываем их в удобные массивы для услуг и тканей
const serviceImages = [troika, pidjak, bruki];
const fabricImages = [sherst, lion, tvid];

function Catalog() {
    const [services, setServices] = useState([]);
    const [fabrics, setFabrics] = useState([]);

    useEffect(() => {
        api.get('services/').then((res) => setServices(res.data)).catch(console.error);
        api.get('fabrics/').then((res) => setFabrics(res.data)).catch(console.error);
    }, []);

    return (
        <div>
            {/* Главный блок */}
            <div className="text-center mb-5 pb-4 border-bottom" style={{ borderColor: '#443a35 !important' }}>
                <p className="text-uppercase text-gold mb-2" style={{ letterSpacing: '2px', fontSize: '0.9rem' }}>Премиальный</p>
                <h1 className="display-4 text-white serif-font mb-4">Индивидуальный пошив <br/> одежды на заказ</h1>
                <p className="text-white-50" style={{ fontWeight: 300 }}>Сочетаем безупречный стиль, комфорт и высочайшее качество</p>
            </div>
            
            <h2 className="mb-4 text-center serif-font">Наши услуги</h2>
            <div className="row mb-5 justify-content-center">
                {services.map((service, index) => (
                    <div key={service.id} className="col-md-4 mb-4">
                        <div 
                            className="card h-100 text-center overflow-hidden" 
                            style={{ 
                                backgroundColor: '#312a26', 
                                border: '1px solid #443a35', 
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-6px)';
                                e.currentTarget.style.borderColor = '#c8a97e';
                                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(200, 169, 126, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = '#443a35';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* Уникальная фотография для каждой услуги (берется по индексу) */}
                            <div style={{ height: '220px', overflow: 'hidden', backgroundColor: '#1a1513' }}>
                                <img 
                                    src={serviceImages[index % serviceImages.length]} 
                                    alt={service.name} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)' }}
                                />
                            </div>

                            <div className="card-body p-4">
                                <h4 className="card-title serif-font text-white mb-3">{service.name}</h4>
                                <p className="card-text text-white-50" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{service.description}</p>
                            </div>
                            <div className="card-footer bg-transparent border-0 pb-4 pt-0">
                                <span className="text-gold fs-5 serif-font">от {service.price} ₽</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="mb-4 text-center serif-font">Коллекция тканей</h2>
            <div className="row justify-content-center">
                {fabrics.map((fabric, index) => (
                    <div key={fabric.id} className="col-md-4 mb-4">
                        <div 
                            className="card h-100 text-center overflow-hidden" 
                            style={{ 
                                backgroundColor: '#312a26', 
                                border: '1px solid #443a35', 
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-6px)';
                                e.currentTarget.style.borderColor = '#c8a97e';
                                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(200, 169, 126, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = '#443a35';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* Уникальная фотография для каждой ткани */}
                            <div style={{ height: '220px', overflow: 'hidden', backgroundColor: '#1a1513' }}>
                                <img 
                                    src={fabricImages[index % fabricImages.length]} 
                                    alt={fabric.name} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)' }}
                                />
                            </div>

                            <div className="card-body p-4">
                                <h4 className="card-title serif-font text-white mb-3">{fabric.name}</h4>
                                <p className="card-text text-white-50" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{fabric.description}</p>
                            </div>
                            <div className="card-footer bg-transparent border-0 pb-4 pt-0">
                                <span className="text-gold fs-5 serif-font">{fabric.price} ₽</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Catalog;