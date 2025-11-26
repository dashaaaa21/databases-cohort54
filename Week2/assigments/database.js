import pkg from 'pg';
const { Client } = pkg;

export const client = new Client({
    user: 'hyfuser',
    host: 'localhost',
    database: 'authors_db',
    password: 'hyfpassword',
    port: 5432,
});