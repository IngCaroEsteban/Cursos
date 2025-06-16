from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Curso,Leccion
from .serializers import CursoSerializer,LeccionSerializer

class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer

    @action(detail=True, methods=['get'])
    def lecciones(self, request, pk=None):
        curso = self.get_object()
        lecciones = curso.leccion.all() # Asumiendo related_name='leccion' en el ForeignKey de Leccion a Curso
        serializer = LeccionSerializer(lecciones, many=True)
        return Response(serializer.data)

class LeccionViewSet(viewsets.ModelViewSet):
    queryset = Leccion.objects.all()
    serializer_class = LeccionSerializer
# Create your views here.
