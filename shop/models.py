from django.db import models
from django.contrib.auth.models import User


class Fabric(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название ткани")
    description = models.TextField(verbose_name="Описание")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена")

    def __str__(self):
        return self.name



class Service(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название услуги")
    description = models.TextField(verbose_name="Описание")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Базовая цена")

    def __str__(self):
        return self.name


class Measurement(models.Model):
    client = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Клиент")
    chest = models.PositiveIntegerField(verbose_name="Обхват груди (см)")
    waist = models.PositiveIntegerField(verbose_name="Обхват талии (см)")
    sleeve_length = models.PositiveIntegerField(verbose_name="Длина рукава (см)")

    def __str__(self):
        return f"Мерки клиента: {self.client.username}"


class Order(models.Model):
    STATUS_CHOICES = [
        ('NEW', 'Новый'),
        ('IN_PROGRESS', 'В работе'),
        ('DONE', 'Готово'),
    ]

    client = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Клиент")
    fabric = models.ForeignKey(Fabric, on_delete=models.PROTECT, verbose_name="Выбранная ткань")
    # НОВАЯ СВЯЗЬ: УСЛУГА
    service = models.ForeignKey(Service, on_delete=models.PROTECT, verbose_name="Выбранная услуга", null=True)
    measurement = models.ForeignKey(Measurement, on_delete=models.PROTECT, verbose_name="Мерки для заказа")

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='NEW', verbose_name="Статус")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")

    def __str__(self):
        return f"Заказ №{self.id} от {self.client.username}"