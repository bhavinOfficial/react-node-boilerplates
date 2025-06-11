'use strict';

import envConfig from '../../config/env.config';
import { Sequelize } from 'sequelize';
import * as fs from 'fs';
import * as path from 'path';
const basename = path.basename(__filename);
const env: string | undefined = envConfig.environment;
import dbconfig from '../../config/db.config';
const config: { [key: string]: any } =
  dbconfig[env as 'development' | 'production' | 'test'];

const db: {
  [key: string]: any;
} = {};
const sequelize = new Sequelize(
  config.database || '',
  config.username || '',
  config.password || undefined,
  {
    ...config,
    pool: {
      max: 5,
      min: 1,
      idle: 10000,
      acquire: 20000,
    },
  }
);
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      (file.slice(-3) === '.ts' || file.slice(-3) === '.js')
    );
  })
  .forEach((file) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const model = require(path.join(__dirname, file))(sequelize);
    Object.assign(db, { [model.name]: model });
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// sequelize
//     .sync({ alter: true })
//     .then(() => {
//         if (!isTestEnviorment) logger.verbose('Database & tables created!');
//     })
//     .catch((err: any) => {
//         logger.error(`catch error in model/index.ts: ${err}`);
//     });

Object.assign(db, { sequelize });
Object.assign(db, { Sequelize });

export default db;
