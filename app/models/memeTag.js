import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/client.js';

class MemeTag extends Model {}

MemeTag.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

}, {
  sequelize,
  tableName: 'meme_has_tag',
});

export default MemeTag;
