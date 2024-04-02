import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/client.js';

class RefreshTokens extends Model {}

RefreshTokens.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  token: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },

  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },

}, {
  sequelize,
  tableName: 'refresh_tokens',
});

export default RefreshTokens;
