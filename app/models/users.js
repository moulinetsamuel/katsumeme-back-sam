import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/client.js';

class Users extends Model {}

Users.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  firstname: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  lastname: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  nickname: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },

  avatarUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

}, {
  sequelize,
  tableName: 'users',
});

export default Users;
