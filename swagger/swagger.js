const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "club",
      description:
        "프로젝트 설명 Node.js Swagger swagger-jsdoc 방식 Restful API 클라이언트 UI",
    },
    servers: [
      {
        url: "http://localhost:4000", // 요청 url
      },
    ],
  },

  apis: ["./routes/*.js", "./swagger/*"],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
