import 'dotenv/config';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 30000,
  },
  logging: false,
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default sequelize;
