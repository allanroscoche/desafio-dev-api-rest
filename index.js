const express = require('express');
const app = express();
const port = 3000;
const routes = require("./routes");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Dock challenge',
      version: '1.0.0',
    },
    basePath: '/api'
  },
  apis: ['./routes.js'],
};

const swaggerSpec = swaggerJsdoc(options);

app.use(bodyParser.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {explorer:true}));
app.use('/api', routes);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
