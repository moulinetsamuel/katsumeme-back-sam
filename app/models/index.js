import MemeComment from './memeComment.js';
import MemeLike from './memeLike.js';
import Memes from './memes.js';
import MemeTag from './memeTag.js';
import RefreshTokens from './refreshToken.js';
import Roles from './roles.js';
import Tags from './tags.js';
import UserBookmark from './userBookmark.js';
import Users from './users.js';
import sequelize from '../config/client.js';

Memes.hasMany(MemeComment, {
  as: 'Comments',
  foreignKey: 'memeId',
});
MemeComment.belongsTo(Users, {
  as: 'User',
  foreignKey: 'userId',
});