import dotenv from 'dotenv';

dotenv.config();

const {
    ENV,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
} = process.env;

export default {
    env: ENV,
    db_host: POSTGRES_HOST,
    db_port: POSTGRES_PORT,
    db_name: POSTGRES_DB,
    db_test_name: POSTGRES_TEST_DB,
    db_user: POSTGRES_USER,
    db_passwoed: POSTGRES_PASSWORD,
};