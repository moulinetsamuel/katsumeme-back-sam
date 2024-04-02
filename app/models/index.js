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
import MemeBookmark from './userBookmark.js';

Memes.belongsToMany(Users, {
  as: 'CommentedBy',
  through: MemeComment,
  foreignKey: 'memesId',
  otherKey: 'usersId',
});
Users.belongsToMany(Memes, {
  as: 'Comments',
  through: MemeComment,
  foreignKey: 'usersId',
  otherKey: 'memesId',
});

Users.belongsToMany(Memes, {
  as: 'Likes',
  through: MemeLike,
  foreignKey: 'usersId',
  otherKey: 'memesId',
});
Memes.belongsToMany(Users, {
  as: 'LikedBy',
  through: MemeLike,
  foreignKey: 'memesId',
  otherKey: 'usersId',
});

Users.belongsToMany(Memes, {
  as: 'Bookmarks',
  through: MemeBookmark,
  foreignKey: 'usersId',
  otherKey: 'memesId',
});
Memes.belongsToMany(Users, {
  as: 'BookmarkedBy',
  through: MemeBookmark,
  foreignKey: 'memesId',
  otherKey: 'usersId',
});

Tags.belongsToMany(Memes, {
  as: 'Tags',
  through: MemeTag,
  foreignKey: 'TagsId',
  otherKey: 'memesId',
});
Memes.belongsToMany(Tags, {
  as: 'Memes',
  through: MemeTag,
  foreignKey: 'memesId',
  otherKey: 'TagsId',
});