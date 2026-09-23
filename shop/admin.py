from django.contrib import admin
# Добавили Service в импорт
from .models import Fabric, Service, Measurement, Order

admin.site.register(Fabric)
admin.site.register(Service) # Зарегистрировали
admin.site.register(Measurement)
admin.site.register(Order)