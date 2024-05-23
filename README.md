# Backend-Final
Proyecto Final Backend

Este proyecto se realiza como práctica integradora para el curso de Backend de Coderhouse, en el mismo se utiliza Express para crear el backend de un e-commerce. 

El objetivo de la práctica es migrar el modelo de persistencia de datos de FileSystem a MongoDB.

## Instalación

Para instalar y ejecutar el proyecto, se deben seguir los siguientes pasos:

-Clonar el repositorio:
```sh
git clone https://github.com/claudiomgarcia/Backend-Final.git
```
-Instalar las dependencias:
```sh
npm install
```

-Iniciar la aplicación: 
```sh
npm start
```

## Estado del proyecto
Este proyecto está en desarrollo y se trata de un proyecto con fines educativos.

### Vistas del proyecto:

#### /products
Muestra un listado con todos los productos.
![alt text](<src/public/img/readme/Captura de pantalla 2024-05-22 180228.png>)
Se puede ordenar por precio ascendente y descendente y ver por disponibilidad. La paginación varia según el el valor de query param "limit", por defecto 10.

Se puede filtrar por categorias, utilizando el query param "?query=NombredelaCategoria" o haciendo click en la tarjeta de algún producto:

![alt text](<src/public/img/readme/Captura de pantalla 2024-05-22 180440.png>)

Cada tarjeta de producto indica si está disponible o no.

#### /cart/:cid
![alt text](<src/public/img/readme/Captura de pantalla 2024-05-22 181014.png>)
Muestra todos los producos contenidos en un carrito especifico y suma el total del mismo.

## Herramientas usadas
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Handlebars](https://handlebarsjs.com/)
- [Socket.IO](https://socket.io/)
- [Bulma](https://bulma.io/)

## Deployment
Próximamente.
