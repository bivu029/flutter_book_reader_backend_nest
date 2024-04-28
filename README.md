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
<style>
.tree {
  font-family: monospace;
  color: #333;
  line-height: 1.5;
}
.tree div {
  position: relative;
}
.tree div::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: -1.5em;
  border-left: 2px solid #d0d0d0;
}
.tree div::after {
  content: '';
  position: absolute;
  top: 0.75em;
  left: -1.5em;
  width: 1.5em;
  height: 0.5em;
  border-bottom: 2px solid #d0d0d0;
  border-left: 2px solid #d0d0d0;
}
.tree div:last-child::before {
  height: 0.75em;
}
.tree div:last-child::after {
  border-left: none;
}
.tree .module {
  color: #d2691e;
}
.tree .file {
  color: #1e90ff;
}
</style>

<div class="tree">
  <div><span class="module">bookreader-app/</span></div>
  <div><span class="file">├── src/</span></div>
  <div><span class="file">│   ├── app.module.ts</span></div>
  <div><span class="file">│   ├── main.ts</span></div>
  <div><span class="file">│   ├── auth/</span></div>
  <div><span class="file">│   │   ├── auth.module.ts</span></div>
  <div><span class="file">│   │   ├── jwt.strategy.ts</span></div>
  <div><span class="file">│   │   ├── jwt.guard.ts</span></div>
  <div><span class="file">│   │   ├── google-auth.guard.ts</span></div>
  <div><span class="file">│   │   ├── constants.ts</span></div>
  <div><span class="file">│   ├── user/</span></div>
  <div><span class="file">│   │   ├── user.module.ts</span></div>
  <div><span class="file">│   │   ├── user.service.ts</span></div>
  <div><span class="file">│   │   ├── user.controller.ts</span></div>
  <div><span class="file">│   │   ├── user.entity.ts</span></div>
  <div><span class="file">│   ├── book/</span></div>
  <div><span class="file">│   │   ├── book.module.ts</span></div>
  <div><span class="file">│   │   ├── book.service.ts</span></div>
  <div><span class="file">│   │   ├── book.controller.ts</span></div>
  <div><span class="file">│   │   ├── book.entity.ts</span></div>
  <div><span class="file">│   │   ├── dto</span></div>
  <div><span class="file">│   │   │    ├── createbook.dto.ts</span></div>
  <div><span class="file">│   │   │    ├── updatebook.dto.ts</span></div>
  <div><span class="file">│   │   ├── database</span></div>
  <div><span class="file">│   │   └── schema</span></div>
  <div><span class="file">│   └── core/</span></div>
  <div><span class="file">│        ├── common</span></div>
  <div><span class="file">│                 ├── decorator</span></div>
  <div><span class="file">│                 ├── exception</span></div>
  <div><span class="file">│                 ├── guard</span></div>
  <div><span class="file">├── test/</span></div>
  <div><span class="file">│   ├── app.e2e-spec.ts</span></div>
  <div><span class="file">├── package.json</span></div>
  <div><span class="file">├── tsconfig.json</span></div>
  <div><span class="file">├── tsconfig.build.json</span></div>
  <div><span class="file">├── nest-cli.json</span></div>
</div>
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