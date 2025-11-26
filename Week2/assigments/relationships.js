import { client } from './database.js';

async function setupDatabase() {
    try {
        await client.connect();

        await client.query(`
            DROP TABLE IF EXISTS author_paper CASCADE;
            DROP TABLE IF EXISTS research_papers CASCADE;
            DROP TABLE IF EXISTS authors CASCADE;
        `);


        await client.query(`
            CREATE TABLE authors (
                author_id SERIAL PRIMARY KEY,
                author_name VARCHAR(255) UNIQUE,
                university VARCHAR(255),
                date_of_birth DATE,
                h_index INT,
                gender VARCHAR(10),
                mentor INT,
                CONSTRAINT fk_mentor FOREIGN KEY (mentor)
                    REFERENCES authors (author_id)
                    ON DELETE SET NULL
            );
        `);

        await client.query(`
            CREATE TABLE research_papers (
                paper_id SERIAL PRIMARY KEY,
                paper_title VARCHAR(255) UNIQUE,
                conference VARCHAR(100),
                publish_date DATE
            );
        `);


        await client.query(`
            CREATE TABLE author_paper (
                author_id INT,
                paper_id INT,
                PRIMARY KEY (author_id, paper_id),
                FOREIGN KEY (author_id) REFERENCES authors (author_id) ON DELETE CASCADE,
                FOREIGN KEY (paper_id) REFERENCES research_papers (paper_id) ON DELETE CASCADE
            );
        `);


        await client.query(`
            INSERT INTO authors (author_name)
            VALUES 
                ('Daryna Tkachenko'),
                ('Andrii Shevchenko'),
                ('Oksana Kovalenko'),
                ('Kateryna Tkachenko'),
                ('Dmytro Bondarenko'),
                ('Iryna Melnyk'),
                ('Taras Kravets'),
                ('Maria Polishchuk'),
                ('Oleksii Havrylenko'),
                ('Sofia Lysenko'),
                ('Yurii Hrytsenko'),
                ('Viktoria Kuzmenko'),
                ('Bohdan Petrenko'),
                ('Natalia Horobets'),
                ('Roman Yaremchuk')
            ON CONFLICT DO NOTHING;
        `);


        await client.query(`
            INSERT INTO research_papers (paper_title, conference, publish_date)
            VALUES 
                ('Design', 'A', '2025-05-05'),
                ('Energy', 'B', '2025-05-06'),
                ('Vision', 'C', '2025-05-07'),
                ('Robots', 'D', '2025-05-08'),
                ('Systems', 'E', '2025-05-09'),
                ('Health', 'F', '2025-05-10'),
                ('Models', 'G', '2025-05-11'),
                ('Networks', 'H', '2025-05-12'),
                ('Privacy', 'I', '2025-05-13'),
                ('Finance', 'J', '2025-05-14'),
                ('Learning', 'K', '2025-05-15'),
                ('Control', 'L', '2025-05-16'),
                ('Climate', 'M', '2025-05-17'),
                ('Security', 'N', '2025-05-18'),
                ('Agriculture', 'O', '2025-05-19'),
                ('Mining', 'P', '2025-05-20'),
                ('Sensors', 'Q', '2025-05-21'),
                ('Mobility', 'R', '2025-05-22'),
                ('Tracking', 'S', '2025-05-23'),
                ('Analytics', 'T', '2025-05-24'),
                ('Optimization', 'U', '2025-05-25'),
                ('Chemistry', 'V', '2025-05-26'),
                ('Dynamics', 'W', '2025-05-27'),
                ('Physics', 'X', '2025-05-28'),
                ('Cognition', 'Y', '2025-05-29'),
                ('Materials', 'Z', '2025-05-30'),
                ('Testing', 'A1', '2025-05-31'),
                ('Training', 'B1', '2025-06-01'),
                ('BioTech', 'C1', '2025-06-02'),
                ('Automation', 'D1', '2025-06-03')
            ON CONFLICT DO NOTHING;
        `);


        await client.query(`
            INSERT INTO author_paper (author_id, paper_id)
            VALUES
                (1, 1),  (1, 2),
                (2, 3),  (2, 4),
                (3, 5),  (3, 6),
                (4, 7),  (4, 8),
                (5, 9),  (5, 10),
                (6, 11), (6, 12),
                (7, 13), (7, 14),
                (8, 15), (8, 16),
                (9, 17), (9, 18),
                (10, 19), (10, 20),
                (11, 21), (11, 22),
                (12, 23), (12, 24),
                (13, 25), (13, 26),
                (14, 27), (14, 28),
                (15, 29), (15, 30)
            ON CONFLICT DO NOTHING;
        `);

        console.log("Database setup completed successfully.");
    } catch (err) {
        console.error("Error setting up database:", err);
    } finally {
        await client.end();
    }
}

setupDatabase();
