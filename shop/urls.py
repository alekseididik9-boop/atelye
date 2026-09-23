from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FabricViewSet, MeasurementViewSet, OrderViewSet
from .views import RegisterView
from .views import ServiceViewSet

# Роутер автоматически генерирует ссылки для CRUD
router = DefaultRouter()
router.register('fabrics', FabricViewSet)
router.register('measurements', MeasurementViewSet)
router.register('orders', OrderViewSet)
router.register('services', ServiceViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
]


