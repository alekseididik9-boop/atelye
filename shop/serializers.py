from rest_framework import serializers
from .models import Fabric, Service, Measurement, Order

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