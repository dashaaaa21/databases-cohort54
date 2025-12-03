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

    await client.query(`
    INSERT INTO account (account_number, balance)
    VALUES
      (101, 5000),
      (102, 2000)
    ON CONFLICT (account_number) DO NOTHING;
  `);

    await client.query(`
    INSERT INTO account_changes (account_number, amount, changed_date, remark)
    VALUES
      (101, 0, NOW(), 'Start balance'),
      (102, 0, NOW(), 'Start balance');
  `);

    console.log("Sample data inserted!");
    await client.end();
}

main();
