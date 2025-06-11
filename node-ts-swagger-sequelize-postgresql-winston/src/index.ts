import cors from 'cors';
import express, { Application } from 'express';
import db from './db/models/index';
import routes from './routes/index';
import logger from './common/logger';
import config from './config/env.config';
import morgan from 'morgan';
import helmet from 'helmet';
import swaggerUI, { SwaggerOptions } from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import path from 'path';
import fs from 'fs';
const port = config.app_port;
const app: Application = express();

app.use(morgan('dev'));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//* API routes path
const apiDir = path.join(__dirname, 'routes');
const apiFiles = fs.readdirSync(apiDir);
const apiPaths = apiFiles.map((file) => path.join(apiDir, file));

//* Swagger UI
const swaggerOptions: SwaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Avakash pvt. ltd.',
      version: '1.0.0',
    },
    servers: [
      {
        url: `${config.swagger_base_url}/api/v1/`,
        description: 'Development server',
        default: true,
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          scheme: 'bearer',
          in: 'header',
        },
      },
    },
  },
  apis: apiPaths,
  host: config.swagger_base_url,
};

//* add apiPath to swaggerOptions
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api/v1/', routes);

app.use(
  '/avakash/swagger-api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocs, {
    customSiteTitle: 'Avakash API',
  })
);

app.get('/avakash/docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
});

// Test database connection and start the server
db.sequelize
  .authenticate()
  .then(() => {
    logger.info('Database connection has been established successfully.');

    app.listen(port, () => {
      logger.info(`Server started on port ${port}`);
      logger.info(
        `Swagger running on http://localhost:${config.app_port}/avakash/swagger-api-docs`
      );

      db.sequelize.sync({ alter: true }).then(() => {
        logger.info('Database and tables are synced.');
      });
    });
  })
  .catch((error: Error) => {
    logger.error('Unable to connect to the database:', error);
  });
