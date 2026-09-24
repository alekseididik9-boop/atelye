from rest_framework import serializers
from .models import Fabric, Service, Measurement, Order
from django.contrib.auth.models import User

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
    class Meta:
        model = Order
        fields = '__all__'
        # ID клиента и дату берем автоматически.
        read_only_fields = ('client', 'created_at')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # В качестве телефона по паспорту проекта используем username
        fields = ('id', 'username', 'password', 'first_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', '')
        )
        return user