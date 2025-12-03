import { Client } from 'pg';

async function main() {
    const client = new Client({
        host: "localhost",
        user: "hyfuser",
        password: "hyfpassword",
        database: "transactions",
        port: 5432
    });

    await client.connect();

    await client.query(`DROP TABLE IF EXISTS account_changes;`);
    await client.query(`DROP TABLE IF EXISTS account;`);

    await client.query(`
    CREATE TABLE account (
      account_number INT PRIMARY KEY,
      balance NUMERIC(10,2)
    );
  `);

    await client.query(`
    CREATE TABLE account_changes (
      change_number SERIAL PRIMARY KEY,
      account_number INT,
      amount NUMERIC(10,2),
      changed_date TIMESTAMP,
      remark VARCHAR(255)
    );
  `);

    console.log("Tables created!");
    await client.end();
}

main();
