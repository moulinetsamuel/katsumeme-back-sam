DROP DATABASE IF EXISTS katsumeme;
DROP USER IF EXISTS katsumeme;
CREATE USER katsumeme WITH PASSWORD 'katsumeme';
ALTER USER katsumeme CREATEDB;
CREATE DATABASE katsumeme OWNER katsumeme;