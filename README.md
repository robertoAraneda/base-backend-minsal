<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Desarrollo

Comenzamos creando 2 módulos.

```
$ nest g resource users
$ nest g resource auth
```

### Prisma ORM

Para instalar el ORM `Prisma`

```bash
$ npm install prisma --save-dev
```

Inicializamos Prisma. Con este comando se cra un archivo `.env` y la carpeta `prisma` con el archivo `schema.prisma`

```bash
$ npx prisma init
```

Modificamos el archivo `.env` con las credenciales de la base de datos `postgreSQL`.

```text
DATABASE_URL="postgresql://develop:develop@localhost:5432/base_backend_minsal?schema=public"
```

En esta cadena de conexión, `develop:develop` es el _usuario:contraseña_, y `base_backend_minsal` es el _nombre_ de la base de datos.

Luego creamos la tabla User en el archivo `schema.prisma`

```prisma
model User {
  id        Int     @default(autoincrement()) @id
  email     String  @unique
  run       String
  name      String
  password  String
}
```

Luego ejecutamos el comando

```bash
$ npx prisma migrate dev --name init
```

Observarás una salida en la terminal:

```bash
$ /Users/robertoaraneda/Projects/MINSAL/backend-base/node_modules/.bin/prisma migrate dev --name init
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "base_backend_minsal", schema "public" at "localhost:5432"

Applying migration `20220214235124_init`

The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20220214235124_init/
    └─ migration.sql

Your database is now in sync with your schema.
```
Creamos el módulo prisma para crear la clase service que será utilizado por el resto de los módulos.

```bash
$ nest g resource prisma
```

Creamos dos archivos en la carpeta filters, para gestionar los errores HTTP y de Prisma.

Para crar los DTO, importamos:

```bash
$ npm install class-transformer class-validator
```

Para probar nuestra API creamos un archivo `.http` y agregamos el siguiente request:

```http request
### POST users
POST  http://localhost:3000/users
Content-Type: application/json

{
  "run": "15654738-7",
  "name": "Roberto",
  "password": "pass",
  "email": "robaraneda@gmail.com"
}

```

y obtenemos el resultado:

```bash
POST http://localhost:3000/users

HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 93
ETag: W/"5d-+Um42hU4veDto7YiLFUiEXtjrmA"
Date: Tue, 15 Feb 2022 00:49:13 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "id": 1,
  "email": "robaraneda@gmail.com",
  "run": "15654738-7",
  "name": "Roberto",
  "password": "pass"
}

Response code: 201 (Created); Time: 175ms; Content length: 93 bytes
```
