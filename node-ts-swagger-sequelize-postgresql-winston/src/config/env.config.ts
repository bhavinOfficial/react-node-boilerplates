import Joi from 'joi';
import logger from '../common/logger';

import dotenv from 'dotenv';
dotenv.config();

//* get the intended host and port number, use localhost and port 3000 if not provided
const envVarsSchema = Joi.object()
  .keys({
    SWAGGER_BASE_URL: Joi.string().required().description('Swagger base url'),
    APP_PORT: Joi.number().required().description('Application Port'),
    DB_HOST: Joi.string().required().description('Database host'),
    DB_PORT: Joi.number().default(5432).description('Database port'),
    DB_NAME: Joi.string().required().description('Database name'),
    DB_USERNAME: Joi.string().required().description('Database user name'),
    DB_PASSWORD: Joi.string().required().description('Database password'),
    DB_SCHEMA: Joi.string().required().description('Database schema'),
    DB_DIALECT: Joi.string().required().description('Database dialect'),
    JWT_SECRET_KEY: Joi.string().required().description('JWT secret key'),
    JWT_EXPIRES_IN: Joi.string().required().description('JWT expiration time'),
  })
  .unknown();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let envVars: any = {};
const { value, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);
if (error) {
  logger.error(`Config validation error: ${error.message}`);
  throw new Error(`Config validation error: ${error.message}`);
}
envVars = value;

//* Export the config object based on the NODE_ENV
const config = {
  environment: envVars.NODE_ENV,
  swagger_base_url: envVars.SWAGGER_BASE_URL,
  app_port: envVars.APP_PORT,
  db_host: envVars.DB_HOST,
  db_port: envVars.DB_PORT,
  db_name: envVars.DB_NAME,
  db_username: envVars.DB_USERNAME,
  db_password: envVars.DB_PASSWORD,
  db_schema: envVars.DB_SCHEMA,
  db_dialect: envVars.DB_DIALECT,
  jwt: {
    secret_key: envVars.JWT_SECRET_KEY,
    expires_in: envVars.JWT_EXPIRES_IN,
  },
};

export default config;
