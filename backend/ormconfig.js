module.exports = {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    charset: 'utf8',
    synchronize: process.env.NODE_ENV !== 'production',
    entities: ['**/**.entity.ts'],
    logging: 'error',
    migrations: ['migration/*.ts'],
    cli: {
        migrationsDir: 'migration',
    },
    connectTimeout: 20000,
    acquireTimeout: 20000,
}
