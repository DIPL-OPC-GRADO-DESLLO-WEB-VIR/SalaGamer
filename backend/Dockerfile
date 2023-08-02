# Dockerfile para el backend
FROM php:8.0-apache

# Instala las extensiones necesarias para conectarse a MySQL
RUN docker-php-ext-install mysqli pdo pdo_mysql
# Configurar PHP y Apache
RUN a2enmod rewrite
COPY . /var/www/html/

# Instala las extensiones necesarias para conectarse a MySQL
# VOLUME /var/www/html/