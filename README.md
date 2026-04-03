[![Github Actions CI](https://github.com/Loonz206/lyrical-graphql/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/Loonz206/lyrical-graphql/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/Loonz206/lyrical-graphql/graph/badge.svg)](https://codecov.io/gh/Loonz206/lyrical-graphql)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Known Vulnerabilities](https://snyk.io/test/github/Loonz206/lyrical-graphql/badge.svg)](https://snyk.io/test/github/Loonz206/lyrical-graphql)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Loonz206_lyrical-graphql&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Loonz206_lyrical-graphql)

# Lyrical-GraphQL

A full-stack web application for managing songs and their lyrics, built with GraphQL, React, TypeScript, Express, and MongoDB. Originally inspired by a GraphQL course on Udemy, this project has been extended with TypeScript, full CI/CD, linting, testing, and code quality tooling.

## What It Does

Lyrical-GraphQL lets you:

- **Browse songs** — view a list of all songs stored in the database
- **View song details** — see the lyrics associated with a specific song
- **Add songs** — create new song entries
- **Add lyrics** — attach lyric lines to any song
- **Like lyrics** — up-vote individual lyric lines

The GraphQL API is also exposed via [GraphiQL](https://github.com/graphql/graphiql) at `/graphql`, making it easy to explore and test queries and mutations interactively.

## Tech Stack

| Layer      | Technology                                                    |
| ---------- | ------------------------------------------------------------- |
| Frontend   | React 18, Apollo Client, TypeScript                           |
| Backend    | Node.js, Express, `express-graphql`, TypeScript               |
| API        | GraphQL (with GraphiQL playground at `/graphql`)              |
| Database   | MongoDB (via Mongoose)                                        |
| Bundler    | Webpack 5                                                     |
| Testing    | Jest, React Testing Library                                   |
| CI/CD      | GitHub Actions                                                |
| Code Style | ESLint, Prettier, Standard JS, Commitizen, Husky, lint-staged |

## Prerequisites

- [Node.js](https://nodejs.org/) 22.x (see `.nvmrc`)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (or a local MongoDB instance)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/Loonz206/lyrical-graphql.git
   cd lyrical-graphql
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure the database**

   Open `config/config.ts` and update the MongoDB connection string with your own Atlas URI and credentials, or set a `MONGODB_URI` environment variable if you have updated the server to read from `process.env`.

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:4000` (or whichever port is configured in `config/config.ts`). The GraphiQL playground is available at `http://localhost:4000/graphql`.

## Available Scripts

| Command                 | Description                                        |
| ----------------------- | -------------------------------------------------- |
| `npm run dev`           | Start the dev server with hot-reload via `nodemon` |
| `npm run build`         | Bundle the frontend with Webpack                   |
| `npm run lint`          | Run ESLint across all `.ts` / `.tsx` files         |
| `npm run format`        | Auto-format all files with Prettier                |
| `npm run check-format`  | Check formatting without writing changes           |
| `npm run typecheck`     | Run the TypeScript compiler without emitting files |
| `npm test`              | Run all tests with Jest                            |
| `npm run test:coverage` | Run tests and generate a coverage report           |
| `npm run commit`        | Launch the Commitizen interactive commit helper    |
| `npm run validate`      | Run format check, lint, and typecheck in parallel  |

## Project Structure

```
lyrical-graphql/
├── client/
│   ├── components/       # React components (SongList, SongDetail, LyricCreate, etc.)
│   ├── index.html        # HTML entry point
│   └── index.tsx         # React app entry point
├── server/
│   ├── models/           # Mongoose models (Song, Lyric)
│   ├── schema/           # GraphQL schema, types, queries, and mutations
│   ├── utils/            # Shared utilities (e.g., ObjectId validation)
│   └── server.ts         # Express app setup
├── config/
│   └── config.ts         # App configuration (port, DB credentials)
├── index.ts              # Application entry point
├── jest.config.js        # Jest configuration
├── webpack.config.js     # Webpack configuration
└── tsconfig.json         # TypeScript configuration
```

## GraphQL API

The GraphQL schema exposes the following operations:

### Queries

| Query   | Arguments | Returns           |
| ------- | --------- | ----------------- |
| `songs` | —         | List of all songs |
| `song`  | `id: ID!` | A single song     |
| `lyric` | `id: ID!` | A single lyric    |

### Mutations

| Mutation         | Arguments                     | Returns |
| ---------------- | ----------------------------- | ------- |
| `addSong`        | `title: String`               | Song    |
| `addLyricToSong` | `content: String, songId: ID` | Song    |
| `likeLyric`      | `id: ID`                      | Lyric   |
| `deleteSong`     | `id: ID`                      | Song    |

## Code Coverage

This project uses [Codecov](https://codecov.io/gh/Loonz206/lyrical-graphql) to track test coverage. Coverage reports are automatically generated and uploaded on every push to `main` and on every pull request via the CI/CD pipeline.

To run tests with coverage locally:

```bash
npm run test:coverage
```

Coverage is collected from `server/utils/**/*.ts` and `client/components/**/*.tsx`, with a minimum threshold of **80%** for branches, functions, lines, and statements.

> **Note:** To enable Codecov uploads in your own fork or CI environment, add a `CODECOV_TOKEN` secret to your GitHub repository settings (Settings → Secrets and variables → Actions → New repository secret). You can obtain the token from your [Codecov dashboard](https://codecov.io).

## Contributing

Commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. Use `npm run commit` to launch the interactive Commitizen prompt, or ensure your commit messages follow the format manually.
