# Create your models here.
from django.db import models

class Curso(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    instructor = models.CharField(max_length=100)

    def __str__(self):
        return self.titulo

class Leccion(models.Model):
    titulo = models.CharField(max_length=200)
    contenido= models.URLField() # Enlace a YouTube
    curso = models.ForeignKey(Curso, related_name='leccion', on_delete=models.CASCADE)

    def __str__(self):
        return self.titulo