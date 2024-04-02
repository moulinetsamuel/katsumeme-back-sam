import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Tags extends Model {}

Tags.init({
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
  tableName: 'tags',
});

export default Tags;
