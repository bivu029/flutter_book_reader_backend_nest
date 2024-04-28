<div align="center">
  <a href="https://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
  </a>
  <a href="https://flutter.dev/" target="blank">
    <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fmedium.com%2Fflutter&psig=AOvVaw3p1N8RY11Ss_MhGlJVNsyk&ust=1713850903047000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMjWouSN1YUDFQAAAAAdAAAAABAE" width="200" alt="Flutter Logo" />
  </a>
</div>

<h1 align="center">Flutter Book Reader Backend (NestJS)</h1>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red" alt="Built with NestJS">
  </a>
  <a href="https://www.mongodb.com/" target="_blank">
    <img src="https://img.shields.io/badge/database-MongoDB-green" alt="MongoDB Database">
  </a>
  <a href="https://flutter.dev/" target="_blank">
    <img src="https://img.shields.io/badge/frontend-Flutter-blue" alt="Flutter Frontend">
  </a>
</div>

## Description

The Flutter Book Reader Backend is a scalable and efficient server-side application that provides the necessary APIs for managing books, user authentication, and tracking user reading progress. It is built with [NestJS](https://nestjs.com/), a progressive Node.js framework for building efficient and scalable server-side applications. The frontend of this application is built with [Flutter](https://flutter.dev/), a cross-platform mobile app development framework.

## Features

- 👥 User authentication and authorization
- 📚 Book management (CRUD operations)
- 📖 Track user reading progress
- 🗄️ Integration with MongoDB database
- 🌐 RESTful API endpoints

## Project Structure
<div align="center">
bookreader-app/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── jwt.strategy.ts
│   │   ├── jwt.guard.ts
│   │   ├── google-auth.guard.ts
│   │   ├── constants.ts
│   │   └── ...
│   ├── user/
│   │   ├── user.module.ts
│   │   ├── user.service.ts
│   │   ├── user.controller.ts
│   │   ├── user.entity.ts
│   │   └── ...
│   ├── book/
│   │   ├── book.module.ts
│   │   ├── book.service.ts
│   │   ├── book.controller.ts
│   │   ├── book.entity.ts
│   │   ├── dto
│   │   │    ├──createbook.dto.ts
│   │   │     ├──updatebook.dto.ts
│   │   ├── database
│   │   └── schema
│   └── core/
│        ├── common 
│                 ├── decorator
│                 ├── exception
│                 ├── gurd
├── test/
│   ├── app.e2e-spec.ts
│   └── ...
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── nest-cli.json
└── ...
</div>
## Installation

```bash
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

Technologies

    🚀 NestJS
    💻 Node.js
    🍃 MongoDB
    🔥 TypeScript
    📱 Flutter

Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
License

This project is licensed under the MIT License.