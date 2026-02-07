# Continues Integration

Continues Integration (CI) is a development practice that requires developers to integrate code into a shared repository several times a day. Each check-in is then verified by an automated build, allowing teams to detect problems early. By integrating regularly, you can detect errors quickly, and locate them more easily.

## History

The concept of CI was first introduced by Grady Booch in his method for software development. The concept was meant to be used in combination with automated unit tests written through the practices of test-driven development. Extreme Programming (XP) adopted the concept of CI and did advocate integrating more than once per day – perhaps as many as tens of times per day.

## Why CI?

CI is a software development practice where members of a team integrate their work frequently, usually each person integrates at least daily - leading to multiple integrations per day. Each integration is verified by an automated build (including test) to detect integration errors as quickly as possible.

## Benefits of CI

1. Automated Build
2. Automated Testing (Unit, Integration, and Functional)
3. Linting (Unified coding style)
4. Security Scanning

## CI Pipeline

A CI pipeline is a series of steps that must be executed in order to deliver a new version of the software. The pipeline is usually triggered by a new commit to the repository. The pipeline can include steps like building the software, running the tests, and deploying the software to a test environment.

## CI in the cPython project

The cPython project uses Travis CI to run the tests on every pull request. The tests are run on multiple versions of Python and on multiple operating systems. This allows the project to ensure that the code is working on all the supported platforms.

(cPython Workflows)[https://github.com/python/cpython/tree/main/.github/workflows]

## CI for a NodeJS project

```yaml
# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs

name: Node.js CI

on:
  push:
    branches: [$default-branch]
  pull_request:
    branches: [$default-branch]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"
      - run: npm ci
      - run: npm run build --if-present
      - run: npm test
```

## Branch Protection

Branch protection is a feature in GitHub that allows you to control the changes that are made to a branch. You can use branch protection to prevent force pushes, prevent changes to the branch, and require status checks to pass before changes can be merged.

## Code Scanning with CodeQL

Code scanning is a feature in GitHub that allows you to find and fix security vulnerabilities in your code. Code scanning uses CodeQL, a powerful static analysis engine that finds security vulnerabilities in your code.
