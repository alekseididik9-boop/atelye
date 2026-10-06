from rest_framework import serializers
from .models import Fabric, Service, Measurement, Order
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class FabricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fabric
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class MeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measurement
        fields = '__all__'
        # Клиент не должен передавать свой ID, мы возьмем его из токена
        read_only_fields = ('client',)

class OrderSerializer(serializers.ModelSerializer):
    # Данные клиента
    client_phone = serializers.CharField(source='client.username', read_only=True)
    client_email = serializers.CharField(source='client.email', read_only=True)
    client_name = serializers.CharField(source='client.first_name', read_only=True)

    # Текстовые названия услуги, ткани и мерок вместо их числовых ID
    service_name = serializers.StringRelatedField(source='service', read_only=True)
    fabric_name = serializers.StringRelatedField(source='fabric', read_only=True)
    measurement_details = serializers.StringRelatedField(source='measurement', read_only=True)
    # Примечание: если в модели Order поле мерок называется во множественном числе (measurements),
    # замени source='measurement' на source='measurements'

    class Meta:
        model = Order
        fields = '__all__'
        # ID клиента и дату берем автоматически.
        read_only_fields = ('client', 'created_at')

class RegisterSerializer(serializers.ModelSerializer):
    # Указываем write_only=True для пароля, чтобы он не возвращался в ответе
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        # Добавляем first_name и email
        fields = ['username', 'password', 'first_name', 'email']

    def create(self, validated_data):
        # Используем встроенный метод create_user, который сам правильно захеширует пароль
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''), # Получаем имя, если оно передано
            email=validated_data.get('email', '')            # Получаем email, если он передан
        )
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Получаем стандартные токены (access, refresh)
        data = super().validate(attrs)
        # Добавляем в ответ статус пользователя (True/False)
        data['is_staff'] = self.user.is_staff
        return data