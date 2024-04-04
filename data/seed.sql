BEGIN;

INSERT INTO "role" ("name") VALUES
  ('Admin'),
  ('User');

INSERT INTO "user" ("firstname", "lastname", "nickname", "avatar_url", "email", "password", "role_id") VALUES
  ('John', 'Doe', 'johndoe', 'https://www.picgifs.com/avatars/cartoons/happy-tree-friends/avatars-happy-tree-friends-422505.gif', 'john@example.com', 'hashed_password_1', 1),
  ('Jane', 'Smith', 'janesmith', 'https://www.picgifs.com/avatars/cartoons/happy-tree-friends/avatars-happy-tree-friends-710172.gif', 'jane@example.com', 'hashed_password_2', 2);

INSERT INTO "tag" ("name") VALUES
  ('Funny'),
  ('Cute'),
  ('Meme'),
  ('Humor');

INSERT INTO "meme" ("image_url", "title", "author_id") VALUES
  ('https://files.slack.com/files-pri/T060RQTSS2C-F06SPNKJ6JE/capture_d___e__cran_2024-04-04_a___00.00.26.png', 'Funny Meme', 1),
  ('https://files.slack.com/files-pri/T060RQTSS2C-F06P4LEHZFA/file.jpg', 'Cute Cat', 2),
  ('https://files.slack.com/files-pri/T060RQTSS2C-F06NKV73K4J/8ihc8q.jpg', 'Hilarious Meme', 1);

INSERT INTO "meme_has_comment" ("comment", "user_id", "meme_id") VALUES
  ('Haha, this made my day!', 2, 1),
  ('So cute!', 1, 2),
  ('LOL, can''t stop laughing!', 2, 3);

INSERT INTO "meme_has_like" ("like", "user_id", "meme_id") VALUES
  (true, 1, 1),
  (true, 2, 2),
  (false, 1, 3);

INSERT INTO "memes_has_tags" ("tag_id", "meme_id") VALUES
  (1, 1),
  (2, 2),
  (3, 1),
  (4, 3);

INSERT INTO "user_has_bookmark" ("user_id", "meme_id") VALUES
  (1, 2),
  (2, 3);

COMMIT;