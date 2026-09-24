from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FabricViewSet, ServiceViewSet, MeasurementViewSet, OrderViewSet, RegisterView

router = DefaultRouter()
router.register('fabrics', FabricViewSet)
router.register('services', ServiceViewSet)
# Добавляем basename вручную, так как мы используем динамический get_queryset
router.register('measurements', MeasurementViewSet, basename='measurement')
router.register('orders', OrderViewSet, basename='order')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
]