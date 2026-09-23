import os
import django

# 1. Подключаем настройки Django, чтобы скрипт мог работать с нашей базой
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User
from shop.models import Fabric, Measurement, Order, Service

print("Начинаем заполнение базы данных...")

# 2. Очищаем старые тестовые данные (чтобы не было дубликатов, если запустишь дважды)
Order.objects.all().delete()
Measurement.objects.all().delete()
Fabric.objects.all().delete()
User.objects.filter(username__in=['ivan', 'petr']).delete()
Service.objects.all().delete()

# 3. Создаем двух клиентов
ivan = User.objects.create_user(username='ivan', password='12345', first_name='Иван')
petr = User.objects.create_user(username='petr', password='12345', first_name='Пётр')
print("Клиенты созданы")

# 4. Создаем ткани
wool = Fabric.objects.create(name="Итальянская шерсть", description="Классическая темно-синяя шерсть для деловых костюмов.", price=25000.00)
linen = Fabric.objects.create(name="Летний лён", description="Легкий бежевый материал для жаркой погоды.", price=15000.00)
tweed = Fabric.objects.create(name="Шотландский твид", description="Плотная ткань в клетку для стильных пиджаков.", price=35000.00)
print("Ткани добавлены")

suit_service = Service.objects.create(name="Пошив костюма-тройки", description="Полный цикл создания костюма по вашим меркам.", price=50000.00)
jacket_service = Service.objects.create(name="Пошив пиджака", description="Создание стильного пиджака.", price=30000.00)
pants_service = Service.objects.create(name="Пошив брюк", description="Классические брюки по фигуре.", price=15000.00)
print("Услуги добавлены")

# 5. Добавляем мерки для клиентов
ivan_measurements = Measurement.objects.create(client=ivan, chest=102, waist=86, sleeve_length=64)
petr_measurements = Measurement.objects.create(client=petr, chest=115, waist=98, sleeve_length=67)
print("Мерки сняты")

# 6. Оформляем заказы
Order.objects.create(client=ivan, fabric=wool, measurement=ivan_measurements, status='NEW')
Order.objects.create(client=petr, fabric=tweed, measurement=petr_measurements, status='IN_PROGRESS')
print("Заказы оформлены")

print("База данных успешно заполнена. Можно проверять.")