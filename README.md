## Demo

Demo is available here:

[https://events-app.kamilzak.pl/](https://events-app.kamilzak.pl)

## Swagger

Swagger documentation api is available here:

[https://events-app.kamilzak.pl/swagger](https://events-app.kamilzak.pl/swagger)

## Environment variables

Default environment development variables are in _.env.development_ file. To set your own variables copy this file as _.env.development.local_ in development or _.env_ in production.

By environment variables you can set port used by app, database access data and secrets used by JWT.

## Installation

```bash
$ npm install
```

## Running the app

Application will create database tables if there are not exists.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
