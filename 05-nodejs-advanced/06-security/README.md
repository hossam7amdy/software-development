# Security

security is one of the most essential attributes of the software design.

## Application Security

1. Authentication and Authorization
2. Web Application Security
3. Data Security
4. Network Security
5. Infrastructure Security

## Authentication and Authorization

1. Authentication (AuthN): Authentication is the process of verifying the identity of a user or process.
2. Authorization (AuthZ): Authorization is the process of verifying that the user has the necessary permissions to access the requested resource.

## Web Application Security

1. Cross-Site Scripting (XSS): XSS is a type of attack that allows attackers to inject client-side scripts into web pages viewed by other users.
2. SQL Injection: SQL injection is a code injection technique that might destroy your database.

## Data Security

- Data security is one of the most critical component of any software system. Data security is the process of protecting data from unauthorized access and data corruption throughout its lifecycle.
- Data can be exchanged between two parties/systems, then it is called _data in transit_. Data can be stored in a database, then it is called _data at rest_.
- **Data-in-transit**: is protected by using encryption and authentication mechanisms (SSL/TLS).
- **Data-at-rest**: is protected by using encryption and access control mechanisms.
- Regularity compliance is a must for data security.

## What are the security categories in Node JS?

1. Application Security
2. Error & Exception Handling
3. Server Security
4. Platform Security

### Application Security

1. Request size limits: to prevent DOS attacks [row-body](https://www.npmjs.com/package/raw-body).
2. Request validation: to prevent SQL injection and XSS attacks [validator](https://www.npmjs.com/package/validator).
3. Output scaping and encoding: to prevent XSS attacks [escape-html](https://www.npmjs.com/package/escape-html).
4. Anti CSRF: to prevent CSRF attacks [csurf](https://www.npmjs.com/package/csrf).
5. Prevent HTTP Parameter Pollutions (HPP): to prevent HPP attacks [hpp](https://www.npmjs.com/package/hpp).

### Error & Exception Handling

1. Handle unexpected errors: to prevent exposing sensitive information to the client [express-async-errors](https://www.npmjs.com/package/express-async-errors).
2. Listen to EventEmitter errors: to prevent crashing the Node JS process.
3. Handle unhandled promise rejections: to prevent crashing the Node JS process.

### Server Security

1. Set cookie flags appropriately: to prevent XSS attacks [express-session](https://www.npmjs.com/package/express-session).
2. Use HTTPS: to encrypt data in transit [HTTPS](https://nodejs.org/api/https.html).
3. Use appropiate HTTP headers: to prevent XSS attacks [helmet](https://www.npmjs.com/package/helmet).

### Platform Security

1. Keep dependencies up to date: to prevent using vulnerable dependencies [npm-check-updates](https://www.npmjs.com/package/npm-check-updates), [retire](https://www.npmjs.com/package/retire).
2. Stay away from evil regular expressions: to prevent ReDoS attacks [safe-regex](https://www.npmjs.com/package/safe-regex).
3. Use strict mode: to prevent using undeclared variables [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode).
4. Use LTS versions of Node JS: to prevent using vulnerable versions of Node JS [Node JS](https://nodejs.org/en/about/releases/).
5. Use a security linter: to prevent using insecure code [eslint-plugin-security](https://www.npmjs.com/package/eslint-plugin-security).

## Top 10 Open Web Application Security Project ([OWASP](https://www.synopsys.com/glossary/what-is-owasp-top-10.html)) Vulnerabilities

1. Injection
2. Broken Authentication
3. Sensitive Data Exposure
4. XML External Entities (XXE)
5. Broken Access Control
6. Security Misconfiguration
7. Cross-Site Scripting XSS
8. Insecure Deserialization
9. Using Components with Known Vulnerabilities
10. Insufficient Logging & Monitoring
