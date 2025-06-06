# Security

## Overview (some security principle)

- Encrypt Connections with SSL and TLS
- Digital Certificates, Signing, and Man in the Middle Attacks
- HTTPS with node
- CORS
- The principle of least privilege
- Auditing npm packages

## openssl certificate command

- creates self-signed SSL certificate (e.g dev use => localhost:...)
- `openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365`

## Authentication vs Authorization

- **Authentication**: Who you are? = LogIn
- **Authorization**: Are you allowed? = Access control

## Authentication Methods/Technologies

- Password-based authentication
- Multi-factor authentication (e.g. Google 2FA)
- Biometric authentication (e.g. Fingerprint/Eye Scanner, Facial/Speaker Recognition )
- Certificate-based authentication (e.g. driver license, passport).
- Social Sign-In

## Authorization Methods/Technologies

- **API Keys**: common with developers (e.g. google map API).
- **JSON Web Tokens(JWT)**: method for representing claims securely between two parties.
- **OAuth**: is a way to get access to protected data from an application. It's safer and more secure than asking users to log in with passwords.

## Cookie Based Authentication

- [How does cookie based authentication work?](https://stackoverflow.com/questions/17769011/how-does-cookie-based-authentication-work)

## Sessions

- Are a way of storing data about the current active user. Data that user cannot modifiy. Sessions are usally short lived.
- Session Middleware in Express
- **Serializing**: Saving the session to the cookie.
- **Deserializing**: Read the session from the cookie.

- **Software Design and Security**:

  - **Application Security** encompasses authentication, authorization, web, data, network, and infrastructure security.
  - **Authentication** verifies user/process identity while **Authorization** confirms permissions for resource access.

- **Web Application Security**:

  - **XSS (Cross-Site Scripting)**: Allows injection of scripts into web pages viewed by other users.
  - **SQL Injection**: A technique that can harm databases through code injection.

- **Data Security**:

  - **Data Security**: Crucial for protecting data from unauthorized access and corruption.
  - **Data-in-transit**: Secured via encryption and authentication (SSL/TLS).
  - **Data-at-rest**: Protected by encryption and access controls. Regular compliance is essential.

- **Security Categories in Node JS**:

  - **Application Security**: Addressed through request size limits, validation, output escaping, CSRF prevention.
  - **Error & Exception Handling**: Focuses on unexpected errors, EventEmitter errors, and unhandled promise rejections.
  - **Server Security**: Involves appropriate cookie flags, HTTPS usage, and HTTP header adjustment.
  - **Platform Security**: Includes dependency management, regex safety, strict mode, LTS Node JS versions, security linting.

- **OWASP Top 10 Vulnerabilities**:
  - **Top Vulnerabilities**: Injection, Broken Authentication, Sensitive Data Exposure, XML External Entities (XXE), Broken Access Control, Security Misconfiguration, XSS, Insecure Deserialization, Using Components with Known Vulnerabilities, Insufficient Logging & Monitoring.

## LINKS

- [HELMET](https://helmetjs.github.io/)
- [JWT](https://jwt.io/)
- [OAuth](https://en.wikipedia.org/wiki/OAuth)
- [Passport](https://www.passportjs.org/)
- [Decode from Base64 format](https://www.base64decode.org/)
- [NodeJS Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html)
