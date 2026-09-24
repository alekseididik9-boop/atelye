from rest_framework import viewsets, permissions
from .models import Fabric, Service, Measurement, Order
from .serializers import FabricSerializer, ServiceSerializer, MeasurementSerializer, OrderSerializer
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import RegisterSerializer

# Кастомное правило: Читать могут все, а изменять - только админы (Мастер)
class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)

class FabricViewSet(viewsets.ModelViewSet):
    queryset = Fabric.objects.all()
    serializer_class = FabricSerializer
    permission_classes = [IsAdminOrReadOnly] # Применили новое правило

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAdminOrReadOnly] # Применили новое правило

class MeasurementViewSet(viewsets.ModelViewSet):
    serializer_class = MeasurementSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Фильтруем: админ видит все мерки, клиент — только свои
    def get_queryset(self):
        if self.request.user.is_staff:
            return Measurement.objects.all()
        return Measurement.objects.filter(client=self.request.user)

    # Автоматически привязываем мерки к текущему пользователю
    def perform_create(self, serializer):
        serializer.save(client=self.request.user)

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Фильтруем: админ видит все заказы, клиент — только свои
    def get_queryset(self):
        if self.request.user.is_staff:
            return Order.objects.all()
        return Order.objects.filter(client=self.request.user)

    # Автоматически привязываем заказ к текущему пользователю
    def perform_create(self, serializer):
        # Если клиент сам делает заказ, принудительно ставим статус NEW
        if not self.request.user.is_staff:
            serializer.save(client=self.request.user, status='NEW')
        else:
            serializer.save(client=self.request.user)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer