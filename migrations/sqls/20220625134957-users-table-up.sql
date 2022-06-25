CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        user_name VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR NOT NULL
);
