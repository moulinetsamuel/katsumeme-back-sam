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
  through: UserBookmark,
  foreignKey: 'usersId',
  otherKey: 'memesId',
});
Memes.belongsToMany(Users, {
  as: 'BookmarkedBy',
  through: UserBookmark,
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

Users.belongsTo(Roles, {
  foreignKey: 'rolesId',
  as: 'Role',
});

Roles.hasMany(Users, {
  as: 'Users',
  foreignKey: 'rolesId',
});

Users.hasMany(RefreshTokens, {
  as: 'RefreshTokens',
  foreignKey: 'usersId',
});
RefreshTokens.belongsTo(Users, {
  as: 'Users',
  foreignKey: 'usersId',
});

export {
  MemeComment,
  MemeLike,
  Memes,
  MemeTag,
  RefreshTokens,
  Roles,
  Tags,
  UserBookmark,
  Users,
  sequelize,
};
