# 1-Platform Assessment

PERN stack and Docker for development.

- User Service: Functionality for authentication
- Ticket service: Apply CRUD operations and ticketing service that belongs to assigned user

# Tech Stack

1. Postgres - Database
2. Node JS - Backend
3. ExpressJS - Web Framework
4. ReactJS - Frontend Framework

# Development

1. Start application

```sh
# Setup .env from .env.example in the server folder
$ docker-compose up --build
```

2. Run migration

```sh
$ knex migrate:latest      
```

3. Run seed

```sh
$ knex seed:run      
```

check localhost:3001 for BE,
check localhost:3000 for FE
