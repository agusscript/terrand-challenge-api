<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

# Recipe App API

Terrand Full-Stack challenge.

## Prerequisites (important)

- [Node >= 20](https://github.com/nvm-sh/nvm) | This project was developed using node version `20.18.3`
- [Docker](https://docs.docker.com/engine/install/) | You will need to have Docker installed to be able to launch the database (MySQL).

## Project setup

```bash
$ npm install
```

## Environment variables

```bash
NODE_ENV=
PORT=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_ROOT_PASSWORD=
DB_NAME=
GLOBAL_PREFIX=
JWT_SECRET=
```

## Run the Docker image with the DB

```bash
$ docker compose up -d
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

# About the challenge

Create an app where users can register and share recipes.

### Mandatory functional requirements completed

- [x] Registration with​ `Name`, `Last Name`, `Email`, `Password`, and `Repeat Password`.
- [x] Login with​ `Email` and `Password`.
- [x] Private section to see all my `recipes`, edit and create a new one.
- [x] A recipe must have at least: `Title`, `Description`, `Ingredients`.
- [x] The application must generate a public link where the recipe can be seen.

### Optional functional requirements completed

- [ ] Allow logged-in users to rate recipes.
- [x] Allow each recipe to upload an image.
- [ ] Publish your application (Deploy).

### Technical requirement completed

- [x] Use any JavaScript technology.