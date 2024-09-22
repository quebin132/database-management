Para instalar las dependencias:

npm install

Es necesario conectar esta API a una base de datos mediante un .env con la siguiente estructura:

DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
PORT=

tsc-alias sirve para que al momento de compilar typescript a javascript y estar usando ESmodules se añada la extesion .js
a los imports y se eviten posibles errores en docker.

<!-- DOCKER -->

SOLO SE PUEDE CONECTAR A LA BASE DE DATOS COMO ROOT, NO COMO USUARIO NO SE PORQUE

SI LA CONEXION FALLA AUN ASI INTENTAR CREAT LA NETWORK APARTE Y DESPUES CORRER EL DOCKER COMPOSE:

docker network create database_net

Y ESTE PARA VER SI FUNCIONO:

docker network inspect database_net
