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

    try {
        await client.query("BEGIN");

        await client.query(`
            UPDATE account
            SET balance = balance - 1000
            WHERE account_number = 101;
        `);

        await client.query(`
            INSERT INTO account_changes (account_number, amount, changed_date, remark)
            VALUES (101, -1000, NOW(), 'Transfer to 102');
        `);

        await client.query(`
            UPDATE account
            SET balance = balance + 1000
            WHERE account_number = 102;
        `);


        await client.query(`
            INSERT INTO account_changes (account_number, amount, changed_date, remark)
            VALUES (102, 1000, NOW(), 'Transfer from 101');
        `);

        await client.query("COMMIT");
        console.log("Transaction completed!");
    } catch (err) {
        console.error("Error! Rolling back...", err);
        await client.query("ROLLBACK");
    } finally {
        await client.end();
    }
}

main();
