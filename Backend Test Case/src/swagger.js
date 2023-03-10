const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "API documentation for Library app",
    },
    basePath: "/",
  },
  apis: ["**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
