CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        status BOOLEAN NOT NULL,
        user_id BIGINT REFERENCES users(id)
);
