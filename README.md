# 1-Platform Assessment

PERN and Docker for development.

# Tech Stack

1. Postgres - Database
2. Node JS - Backend
3. ExpressJS - Web Framework
4. ReactJS - Frontend Framework

# Development

1. Start database

```sh
# Setup .env from .env.example in server folder
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

check localhost:3001 for BE
check localhost:3000 for FE