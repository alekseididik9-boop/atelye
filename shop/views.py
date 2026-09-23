from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from django.contrib.auth.models import User

from .models import Fabric, Measurement, Order, Service
from .serializers import FabricSerializer, MeasurementSerializer, OrderSerializer, RegisterSerializer, ServiceSerializer

# === ЛОГИКА ДЛЯ ТКАНЕЙ ===
class FabricViewSet(viewsets.ModelViewSet):
    queryset = Fabric.objects.all()
    serializer_class = FabricSerializer
    # Смотреть могут все, а изменять - только авторизованные (позже сделаем только админов)
    permission_classes = [IsAuthenticatedOrReadOnly]

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

# === ЛОГИКА ДЛЯ МЕРОК ===
class MeasurementViewSet(viewsets.ModelViewSet):
    queryset = Measurement.objects.all()
    serializer_class = MeasurementSerializer
    # Защита: работать с мерками могут только авторизованные
    permission_classes = [IsAuthenticated]

# === ЛОГИКА ДЛЯ ЗАКАЗОВ ===
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    # Защита: работать с заказами могут только авторизованные
    permission_classes = [IsAuthenticated]

# === ЛОГИКА ДЛЯ РЕГИСТРАЦИИ ===
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    # Регистрация доступна абсолютно всем
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer