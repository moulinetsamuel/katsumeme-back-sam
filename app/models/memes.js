import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Memes extends Model {}

Memes.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  imageUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },

  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

}, {
  sequelize,
  tableName: 'memes',
});

export default Memes;
