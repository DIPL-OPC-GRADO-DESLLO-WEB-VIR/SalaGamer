# Mi Proyecto - Aplicación web con React, PHP, MySQL y Adminer

Este es un proyecto de aplicación web que consta de un frontend desarrollado en React, un backend con PHP y una base de datos MySQL. También se incluye una interfaz de administración para la base de datos utilizando Adminer. Todo el proyecto está configurado para ejecutarse en contenedores Docker, lo que facilita su despliegue y configuración en diferentes entornos.

## Estructura del Proyecto
El proyecto está organizado en las siguientes carpetas:

backend: Contiene el código PHP del backend de la aplicación.
frontend: Contiene el código React del frontend de la aplicación.
docker-compose.yml: Archivo de configuración de Docker Compose para definir y orquestar los servicios.
docker-compose.env: Archivo para definir las variables de entorno utilizadas en el archivo docker-compose.yml.
Requisitos Previos
Antes de ejecutar este proyecto, asegúrate de tener instalados los siguientes programas en tu sistema:

Docker: https://www.docker.com/get-started
Docker Compose: https://docs.docker.com/compose/install/
Instrucciones de Uso
Sigue los siguientes pasos para ejecutar la aplicación:

Clona este repositorio en tu máquina local:
bash
Copy code
git clone https://github.com/tu-usuario/mi-proyecto.git
cd mi-proyecto
Configura las variables de entorno:
Abre el archivo docker-compose.env y ajusta las siguientes variables de entorno con tus propios valores:

makefile
Copy code
MYSQL_ROOT_PASSWORD=your_mysql_root_password
MYSQL_DATABASE=your_database_name
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
Construye y ejecuta los contenedores:
Ejecuta los siguientes comandos en la terminal:

bash

### Copy code

# `docker-compose --env-file ./docker-compose.env build`

# `docker-compose --env-file ./docker-compose.env up`

Esto iniciará la construcción de las imágenes y la ejecución de los contenedores. La aplicación React estará disponible en http://localhost:3000, el backend en http://localhost y Adminer en http://localhost:8080.

Detener los contenedores:
Para detener los contenedores y liberar los recursos, ejecuta el siguiente comando:

Copy code
docker-compose down
Notas adicionales
Para realizar cambios en el código del frontend o el backend, simplemente modifica los archivos dentro de las carpetas frontend y backend. Los cambios se reflejarán automáticamente en los contenedores gracias a los volúmenes configurados.
Si deseas ajustar alguna configuración específica de Apache, PHP o React, puedes editar los respectivos archivos Dockerfile para cada servicio en sus respectivas carpetas.
¡Listo! Ahora deberías tener la aplicación web funcionando en contenedores Docker y estar listo para comenzar a desarrollar y experimentar con tu proyecto.

Espero que esta guía te ayude a comprender y ejecutar el proyecto. ¡Buena suerte con tu aplicación web! Si tienes alguna pregunta o problema, no dudes en crear un issue en este repositorio.
