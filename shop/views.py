from rest_framework import viewsets, permissions
from .models import Fabric, Service, Measurement, Order
from .serializers import FabricSerializer, ServiceSerializer, MeasurementSerializer, OrderSerializer
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from django.core.mail import send_mail

#  Читать могут все, а изменять - только админы (Мастер)
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

    def get_queryset(self):
        if self.request.user.is_staff:
            return Order.objects.all().order_by('-id')
        return Order.objects.filter(client=self.request.user).order_by('-id')

    def perform_create(self, serializer):
        # 1. Создаем заказ
        if not self.request.user.is_staff:
            order = serializer.save(client=self.request.user, status='NEW')
        else:
            order = serializer.save(client=self.request.user)

        # 2. Отправляем письмо клиенту о создании заказа
        if order.client.email:
            send_mail(
                subject=f'Заказ №{order.id} успешно оформлен',
                message=f'Здравствуйте!\n\nВаш заказ №{order.id} принят в работу.\nСтатус: {order.status}\n\nМастер скоро с вами свяжется.',
                from_email='noreply@korona-atelier.ru',
                recipient_list=[order.client.email],
                fail_silently=True,
            )

    # Добавляем метод perform_update для отслеживания изменения статуса мастером
    def perform_update(self, serializer):
        # Получаем старый заказ до сохранения
        instance = self.get_object()
        old_status = instance.status

        # Сохраняем новые данные
        updated_order = serializer.save()

        # Если статус изменился и у клиента есть email, отправляем уведомление
        if old_status != updated_order.status and updated_order.client.email:
            send_mail(
                subject=f'Обновление статуса заказа №{updated_order.id}',
                message=f'Здравствуйте!\n\nСтатус вашего заказа №{updated_order.id} изменился.\nНовый статус: {updated_order.status}',
                from_email='noreply@korona-atelier.ru',
                recipient_list=[updated_order.client.email],
                fail_silently=True,
            )

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer