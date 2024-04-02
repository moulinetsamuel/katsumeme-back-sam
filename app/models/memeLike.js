import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class MemeLike extends Model {}

MemeLike.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  like: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },

}, {
  sequelize,
  tableName: 'meme_has_like',
});

export default MemeLike;
