import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class MemeBookmark extends Model {}

MemeBookmark.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

}, {
  sequelize,
  tableName: 'meme_has_bookmark',
});

export default MemeBookmark;
