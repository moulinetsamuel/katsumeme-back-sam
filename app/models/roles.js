import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/client.js';

class Roles extends Model {}

Roles.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },

}, {
  sequelize,
  tableName: 'roles',
});

export default Roles;
