import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/client.js';

class MemeComment extends Model {}

MemeComment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

}, {
  sequelize,
  tableName: 'meme_has_comment',
});

export default MemeComment;
