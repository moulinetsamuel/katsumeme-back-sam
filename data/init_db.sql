DROP DATABASE IF EXISTS katsumeme;
DROP USER IF EXISTS katsumeme;
CREATE USER katsumeme WITH PASSWORD 'katsumeme';
CREATE DATABASE katsumeme OWNER katsumeme;