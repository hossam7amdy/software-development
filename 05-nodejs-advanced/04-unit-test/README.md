# Unit Testing

- Unit testing is a software testing method by which individual units of source code are tested to determine whether they are fit for use.
- A unit is the smallest testable part of any software.
- It usually has one or a few inputs and usually a single output.
- Unit tests are typically automated tests written and run by software developers to ensure that a section of an application (known as the "unit") meets its design and behaves as intended.

## Advantages of Unit Testing

- Unit testing helps the developers to _understand_ the code base and make changes quickly.
- Unit testing helps to identify the _defects_ early in the development cycle.
- Unit testing helps to improve the _quality_ of the code.
- Unit testing helps to reduce the _cost_ of bug fixes as the bugs are identified in the early phases.
- Unit testing helps the developers to _refactor_ the code easily and make the code cleaner, simpler and extensible.

## Unit Testing Frameworks

- A unit testing framework is a tool that is used to test the individual units of source code.
- It is a collection of tools that are used to automate the process of testing.
- It is also known as a _harness_.
- It is used to develop, execute and analyze the results of the tests.

## What makes a good testing framework?

- Easy to setup and use.
- Well supported and documented.
- A wide array of features (e.g. mocking, code coverage, etc.).
- Good reporting.
- Should be easy to integrate into a CI/CD pipeline.

## Test interfaces

- There are two types of test interfaces:
  - BDD (Behavior Driven Development) - `describe`, `it`, `before`, `after`, `beforeEach`, `afterEach`
  - TDD (Test Driven Development) - `suite`, `test`, `setup`, `teardown`, `suiteSetup`, `suiteTeardown`

## Mocka vs Jest

- Jest is a testing framework developed by Facebook.
- Jest is built on top of Jasmine.
- Jest is a zero configuration testing framework.
- Jest is faster than Mocha as it runs tests in parallel.
- Jest has built-in code coverage reporting.
- Jest has built-in mocking and assertion libraries.

## Testing Frameworks for Node.js

- [Jest](https://jestjs.io/)
- [Mocha](https://mochajs.org/)
- [Jasmine](https://jasmine.github.io/)
