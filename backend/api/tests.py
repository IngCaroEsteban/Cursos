from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Curso

class CourseApiTests(APITestCase):
    def test_create_course(self):
        """
        Asegura que podamos crear un nuevo curso.
        """
        url = reverse('curso-list') # 'course-list' es el nombre base del router
        data = {'titulo': 'Curso de Prueba', 'descripcion': 'Desc', 'instructor': 'Test Instructor'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Curso.objects.count(), 1)
        self.assertEqual(Curso.objects.get().titulo, 'Curso de Prueba')

# Create your tests here.
