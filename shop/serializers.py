from rest_framework import serializers
from .models import Fabric, Measurement, Order
from .models import Service


# Переводчик для Тканей
class FabricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fabric
        fields = '__all__'  # Берем абсолютно все поля из модели

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

# Переводчик для Мерок
class MeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measurement
        fields = '__all__'

# Переводчик для Заказов
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
        # Пароль можно только писать, читать его нельзя
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # create_user автоматически зашифрует пароль в базе
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user