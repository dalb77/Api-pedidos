# API REST de Pedidos

API REST para gestionar pedidos y clientes. Examen final de **Taller de plataformas web** (Forma A).

## Tecnologías
Node.js, Express, MySQL/MariaDB (mysql2), dotenv, cors, Postman.

## Requisitos
- Node.js 18 o superior
- MySQL 8.0.16+ o MariaDB 10.2+ (XAMPP sirve)

## Instalación
1. Clonar el repositorio:
   `git clone https://github.com/TU_USUARIO/Api-pedidos.git`
2. Entrar a la carpeta e instalar dependencias:
   `npm install`
3. Copiar `.env.example` a `.env` y completar los datos de conexión.
4. Ejecutar en MySQL los scripts `database/schema.sql` y luego `database/seed.sql`.
5. Iniciar el servidor: `npm run dev` (o `npm start`).

La API queda disponible en `http://localhost:3000`.

## Estructura del proyecto
```
src/
  config/        conexión a la base de datos
  controllers/   lógica de negocio
  routes/        definición de rutas
  middlewares/   manejo de errores
  app.js         configuración de Express
  server.js      arranque del servidor
database/        schema.sql y seed.sql
postman/         colección de pruebas
evidencias/      capturas de las pruebas
```

## Modelo de datos
- **clientes**(id_cliente PK, nombre, email UNIQUE)
- **pedidos**(id_pedido PK autoincremental, id_cliente FK, cliente, email_cliente, fecha_pedido, total, estado)

Relación 1:N: un cliente puede tener muchos pedidos.
Validaciones en el esquema: `CHECK (total > 0)` y llave foránea `fk_pedido_cliente`.

## Endpoints

| Método | Ruta | Descripción | Respuestas |
|---|---|---|---|
| GET | /api/pedidos | Lista pedidos | 200 |
| GET | /api/pedidos/:id | Obtiene un pedido | 200 / 404 |
| POST | /api/pedidos | Crea un pedido | 201 / 400 / 404 |
| PUT | /api/pedidos/:id | Actualiza un pedido | 200 / 400 / 404 |
| DELETE | /api/pedidos/:id | Elimina un pedido | 204 / 404 |
| GET | /api/clientes | Lista clientes | 200 |
| GET | /api/clientes/:id | Obtiene un cliente | 200 / 404 |
| POST | /api/clientes | Crea un cliente | 201 / 400 / 409 |

## Ejemplo: crear un pedido
`POST /api/pedidos`
```json
{
  "id_cliente": 1,
  "total": 25990.50,
  "estado": "pendiente"
}
```
La API completa automáticamente `cliente` y `email_cliente` desde la tabla `clientes`.

## Pruebas
La colección de Postman está en `/postman` y las capturas de evidencia en `/evidencias`.