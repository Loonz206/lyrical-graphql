[![Github Actions CI](https://github.com/Loonz206/lyrical-graphql/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/Loonz206/lyrical-graphql/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/Loonz206/lyrical-graphql/branch/main/graph/badge.svg)](https://codecov.io/gh/Loonz206/lyrical-graphql)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Known Vulnerabilities](https://snyk.io/test/github/Loonz206/lyrical-graphql/badge.svg)](https://snyk.io/test/github/Loonz206/lyrical-graphql)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Loonz206_lyrical-graphql&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Loonz206_lyrical-graphql)

# Lyrical-GraphQL

Starter project from a GraphQL course on Udemy.com

## Code Coverage

This project uses [Codecov](https://codecov.io/gh/Loonz206/lyrical-graphql) to track test coverage. Coverage reports are automatically generated and uploaded on every push to `main` and on every pull request via the CI/CD pipeline.

To run tests with coverage locally:

```bash
npm run test:coverage
```

Coverage is collected from `server/utils/**/*.ts` and `client/components/**/*.tsx`, with a minimum threshold of **80%** for branches, functions, lines, and statements.

> **Note:** To enable Codecov uploads in your own fork or CI environment, add a `CODECOV_TOKEN` secret to your GitHub repository settings (Settings → Secrets and variables → Actions). You can obtain the token from your [Codecov dashboard](https://codecov.io).
