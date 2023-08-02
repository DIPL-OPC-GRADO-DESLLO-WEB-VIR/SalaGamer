# Dockerfile para el frontend
FROM node:18-alpine

#Directorio de trabajo
WORKDIR /usr/src/app

# Copiar el código fuente

COPY ./app/package*.json ./
COPY ./app .
# Instalar dependencias
RUN npm install



EXPOSE 3000
# Iniciar la aplicación en modo de desarrollo
# CMD ["npm", "start"]

# Exponer el volumen para sincronizar cambios
VOLUME /usr/src/app/node_modules
VOLUME /usr/src/app/src
