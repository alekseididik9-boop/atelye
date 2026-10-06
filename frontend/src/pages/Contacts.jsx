function Contacts() {
    return (
        <div className="container">
            <h2 className="serif-font text-gold mb-4 text-center">Контакты и график работы</h2>
            
            <div className="bg-dark-premium p-4 p-md-5 rounded border shadow-lg" style={{ borderColor: '#443a35' }}>
                
                {/* Верхняя часть: Текстовая информация в две колонки */}
                <div className="row mb-5">
                    <div className="col-md-6 mb-4 mb-md-0 d-flex flex-column justify-content-center">
                        <h4 className="text-white mb-4">Свяжитесь с нами</h4>
                        <p className="fs-5 mb-3">📍 <strong className="text-white-50">Адрес:</strong> г. Москва, ул. Кольцевая, 15</p>
                        <p className="fs-5 mb-3">📞 <strong className="text-white-50">Телефон:</strong> +7 (495) 123-45-67</p>
                        <p className="fs-5 mb-0">✉️ <strong className="text-white-50">Email:</strong> odin@korona-atelier.ru</p>
                    </div>
                    
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <h4 className="text-white mb-4">График работы</h4>
                        <ul className="list-unstyled fs-5 text-white-50 mb-0">
                            <li className="mb-3"><span className="text-white">Понедельник - Пятница:</span> 10:00 — 20:00</li>
                            <li className="mb-3"><span className="text-white">Суббота:</span> 11:00 — 19:00</li>
                            <li><span className="text-white">Воскресенье:</span> Выходной</li>
                        </ul>
                    </div>
                </div>
                
                {/* Нижняя часть: Большая карта */}
                <div className="text-center mt-3">
                    <h4 className="text-white mb-4 text-start">Как нас найти</h4>
                    <img 
                        src="/map.png" 
                        alt="Местоположение ателье на карте" 
                        className="img-fluid rounded border w-100 shadow"
                        style={{ 
                            borderColor: '#443a35', 
                            maxHeight: '600px', // Увеличили максимальную высоту
                            objectFit: 'cover' 
                        }}
                    />
                </div>
                
            </div>
        </div>
    );
}

export default Contacts;