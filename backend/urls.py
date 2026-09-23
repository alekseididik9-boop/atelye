from django.contrib import admin
from django.urls import path, include
# Импортируем готовые вьюхи для токенов
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('shop.urls')),

    # Эндпоинты для авторизации
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]