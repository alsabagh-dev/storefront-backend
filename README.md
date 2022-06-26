# Storefront Backend Project

## Getting Started

### install
 `npm install`

### Databases
you must create 2 databases one for development and one for test

#### connect to psql

- Linux

    Logging in to root PostgreSQL user account

    `sudo -i -u postgres`

    then type

    `psql`

- windows:      `psql -U postgres`

#### create DB user 
- create store_usr with password e.g. 123456
    
    postgres=#  `create user - create store_usr  with encrypted password '123456';`

#### create DBs
- create store database
`CREATE DATABASE store;`
- create store_test database
`CREATE DATABASE store_test;`

#### grant user privilages for the DBs
```
grant all privileges on database store to user_name;
grant all privileges on database store_test to user_name;
```



### Environment
you must have a `.env` file 
```
ENV=<VALUE>
POSTGRES_HOST=<VALUE>
POSTGRES_PORT=<VALUE>
POSTGRES_DB=<VALUE>
POSTGRES_TEST_DB=<VALUE>
POSTGRES_USER=<VALUE>
POSTGRES_PASSWORD=<VALUE>
BCRYPT_PASSWORD=<VALUE>
SALT_ROUNDS=<VALUE>
TOKEN_SECRET=<VALUE>
```
### test
to run test `npm run test`

### create user
you can create user on '/users/' [POST]
structure
```
    {
        "first_name": "<value>",
        "last_name": "<value>",
        "user_name": "<value>",
        "password": "<value>"
    }
```
user_name must be unique per uesr