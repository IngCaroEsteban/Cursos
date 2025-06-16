from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CursoViewSet,LeccionViewSet


router = DefaultRouter()
router.register(r'curso', CursoViewSet)
router.register(r'leccion', LeccionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]