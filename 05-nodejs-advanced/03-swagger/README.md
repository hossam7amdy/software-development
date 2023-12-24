# Swagger

- Swagger is a tool which is used to document APIs.
- Swagger is a specification for documenting REST API.
- Swagger is a set of open-source tools built around the OpenAPI Specification that can help you design, build, document and consume REST APIs.
- Swagger allows you to describe the structure of your APIs so that machines can read them by asking your API to return a YAML or JSON that contains a detailed description of your entire API.

## Specification for REST API

1. What are all the endpoints (GET, POST, PUT, DELETE)?
2. What are all the operations that can be performed on each endpoint?
3. What are the parameters the endpoint accepts?
4. Does API need any authentication?

## Swagger Tools

1. **Swagger Editor**: Swagger Editor lets you edit OpenAPI specifications in YAML inside your browser and to preview documentations in real time.
2. **Swagger Codegen**: Swagger Codegen is a powerful tool that allows to generate client libraries in more than 40 languages from your Swagger spec.
3. **Swagger UI**: Swagger UI allows anyone — be it your development team or your end consumers — to visualize and interact with the API’s resources without having any of the implementation logic in place.
4. **Swagger Inspector**: Swagger Inspector is a free cloud-based API testing and documentation tool to simplify the validation of any API and generate its corresponding OpenAPI documentation.

## Add Swagger to Node.js Project

1. Install swagger-ui-express package.

```bash
npm install swagger-ui-express
```

2. Create a swagger.json file in the root directory of the project.

- _[Basic Structure](https://swagger.io/docs/specification/basic-structure/)_

3. Create a swagger.js file in the root directory of the project.

```js
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
```

4. Import swagger.js file in the app.js file.

```js
require("./swagger")(app);
```

5. Run the application and open the following URL in the browser.

```bash
http://localhost:3000/api-docs
```
