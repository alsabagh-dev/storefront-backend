import config from '../environment.conf';
import { Pool, PoolConfig } from 'pg';


const pool_config: PoolConfig = {
    host: config.db_host,
    database: (config.env === 'dev')? config.db_name : config.db_test_name,
    user: config.db_user,
    password: config.db_passwoed,
    port: parseInt(config.db_port as string),
}

const client = new Pool(pool_config);

export default client;
