import config from './env.config';

export default {
  development: {
    username: config.db_username,
    password: config.db_password,
    database: config.db_name,
    host: config.db_host,
    port: config.db_port,
    schema: config.db_schema,
    dialect: config.db_dialect,
    logging: false,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  },
  test: {
    username: config.db_username,
    password: config.db_password,
    database: config.db_name,
    host: config.db_host,
    port: config.db_port,
    schema: config.db_schema,
    dialect: config.db_dialect,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  },
  production: {
    username: config.db_username,
    password: config.db_password,
    database: config.db_name,
    host: config.db_host,
    port: config.db_port,
    schema: config.db_schema,
    dialect: config.db_dialect,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  },
};
