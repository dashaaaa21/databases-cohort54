import { client } from './database.js';

async function setupAuthorsTable() {
    try {
        await client.connect();

        const sql = `
            DROP TABLE IF EXISTS author_paper CASCADE;
            DROP TABLE IF EXISTS research_papers CASCADE;
            DROP TABLE IF EXISTS authors CASCADE;

            CREATE TABLE authors
            (
                author_id     SERIAL PRIMARY KEY,
                author_name   VARCHAR(255),
                university    VARCHAR(255),
                date_of_birth DATE,
                h_index       INT,
                gender        VARCHAR(10)
            );

            ALTER TABLE authors
                ADD COLUMN mentor INT;

            ALTER TABLE authors
                ADD CONSTRAINT fk_mentor
                    FOREIGN KEY (mentor)
                        REFERENCES authors (author_id)
                        ON DELETE SET NULL;
        `;

        await client.query(sql);
        console.log('Authors table created');
    } catch (err) {
        console.error('Problem creating authors table', err);
    } finally {
        await client.end();
    }
}

setupAuthorsTable();
