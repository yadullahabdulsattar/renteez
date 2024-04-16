const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Renteez APIs",
      version: "1.0.0",
      description: "APIs for managing listings and user",
    },
    servers: [
      {
        url: "http://localhost:3001/api", // Update with your API server URL
      },
    ],
  },
  apis: ["routers/*.js", "controllers/*.js"],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
