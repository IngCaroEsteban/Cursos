from rest_framework import serializers
from .models import Curso, Leccion

class LeccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leccion
        fields = '__all__'

class CursoSerializer(serializers.ModelSerializer):
    lessons = LeccionSerializer(many=True, read_only=True)
    class Meta:
        model = Curso
        fields = '__all__'