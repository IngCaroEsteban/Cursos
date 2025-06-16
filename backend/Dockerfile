# backend/Dockerfile
FROM python:3.9

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

# Inicializa el proyecto Django y la app si no existen
#RUN django-admin startproject core .

EXPOSE 8000

# Si tu aplicación Django se ejecuta en el puerto 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
 # Comando para iniciar tu aplicación Django