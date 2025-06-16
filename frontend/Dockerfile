FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

# Limpia la caché de npm forzadamente y luego instala Angular CLI globalmente
RUN npm cache clean --force && npm install -g @angular/cli@latest

# Instala las dependencias del proyecto.
# --unsafe-perm es crucial para manejar permisos de módulos nativos en Docker.
RUN npm install --unsafe-perm

COPY . .

CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--disable-host-check"]

EXPOSE 4200

