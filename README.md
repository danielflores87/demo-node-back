# demo-node-back
Prueba Tecnica Daniel Flores.

1. Base de datos

Este repositorio incluye tres proyectos,  las api (auth y task) y el front.
Para efectos prácticos se incluyeron los archivos .env junto con una conexión a
una base de datos online de POSTGRESQL. ya queda a criterio si se cambia y se ajustan los 
.env en los repos api-auth y api-task

2. 1. Levantar el proyecto con DOCKER. 

El proyecto viene preparado para levantarse por medio de docker, por lo que solo 
debe ejecutar el siguiente comando en la raíz de este proyecto. "docker-compose up"

una vez complete el sitio se desplegara en http://localhost/

2. 2. Levantar el proyecto MANUALMENTE.

Para el levantar el proyecto de forma local debe seguir lo siguientes pasos
        #Api auth
    1. ingresar al directorio "api-auth"
    2. ejecutar el comando "npm install"
    3. ajustar conexion a la db .env (si no se usara la db online)
    4. ejecutar la migracion de la db con el comando "npm run typeorm:generate" (si no se usara la db online)
    5. ejecutar el comando "npm run start"

        #Api task
    1. ingresar al directorio "api-task"
    2. ejecutar el comando "npm install"
    3. ajustar conexion a la db .env (si no se usara la db online)
    4. ejecutar la migracion de la db con el comando "npm run typeorm:generate" (si no se usara la db online)
    5. ejecutar el comando "npm run start"

        #front
    1. ingresar al directorio "front"
    2. ejecutar el comando "npm install"
    3. ejecutar el comando "npm run dev"
    4. abrir el sitio en http://localhost:5173/



3. Acceso al sitio Demo.

El uso del sitio requiere que el usuario este logeado. para efectos practicos no se
blindaron las rutas en front por lo que puede navegar, aunque solo puede hacer 
peticiones al back si posee un token.

si esta usando la base de datos online, inice sesion con las siguientes credenciales. 
    email: user1@gmail.com
    contraseña: 797940

si se esta conectando a una nueva base de datos, debe acceder al apartado de usuario
dirigirse a la opcion de crear usuario (es la unica opcion que no requiere token), 
cree su usuario e inicie sesion. 


