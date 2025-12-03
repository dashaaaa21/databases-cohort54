import {client} from './database.js';

async function setupDatabase() {
    try {
        await client.connect();


        await client.query(`
            DROP TABLE IF EXISTS author_paper CASCADE;
            DROP TABLE IF EXISTS research_papers CASCADE;
            DROP TABLE IF EXISTS authors CASCADE;
        `);

        await client.query(`
            CREATE TABLE authors
            (
                author_id     SERIAL PRIMARY KEY,
                author_name   VARCHAR(255) UNIQUE,
                university    VARCHAR(255),
                date_of_birth DATE,
                h_index       INT,
                gender        VARCHAR(10),
                mentor        INT,
                CONSTRAINT fk_mentor FOREIGN KEY (mentor)
                    REFERENCES authors (author_id)
                    ON DELETE SET NULL
            );
        `);


        await client.query(`
            CREATE TABLE research_papers
            (
                paper_id     SERIAL PRIMARY KEY,
                paper_title  VARCHAR(255) UNIQUE,
                conference   VARCHAR(100),
                publish_date DATE
            );
        `);


        await client.query(`
            CREATE TABLE author_paper
            (
                author_id INT,
                paper_id  INT,
                PRIMARY KEY (author_id, paper_id),
                FOREIGN KEY (author_id) REFERENCES authors (author_id) ON DELETE CASCADE,
                FOREIGN KEY (paper_id) REFERENCES research_papers (paper_id) ON DELETE CASCADE
            );
        `);


        await client.query(`
            INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor)
            VALUES ('Daryna Tkachenko', 'Taras Shevchenko National University of Kyiv', '2000-05-21', 14, 'Female',
                    NULL),
                   ('Andrii Shevchenko', 'V. N. Karazin Kharkiv National University', '2001-02-14', 22, 'Male', 1),
                   ('Oksana Kovalenko', 'Ivan Franko National University of Lviv', '2002-11-02', 18, 'Female', 2),
                   ('Kateryna Tkachenko', 'National Technical University of Ukraine "Igor Sikorsky KPI"', '2001-10-01',
                    25, 'Female', 1),
                   ('Dmytro Bondarenko', 'Odesa I. I. Mechnikov National University', '2000-12-18', 30, 'Male', 3),
                   ('Iryna Melnyk', 'Sumy State University', '2003-09-10', 20, 'Female', NULL),
                   ('Taras Kravets', 'Lviv Polytechnic National University', '2002-04-30', 17, 'Male', 6),
                   ('Maria Polishchuk', 'Yuriy Fedkovych Chernivtsi National University', '2001-08-15', 12, 'Female',
                    1),
                   ('Oleksii Havrylenko', 'Oles Honchar Dnipro National University', '2000-01-16', 28, 'Male', 4),
                   ('Sofia Lysenko', 'Vasyl Stefanyk Precarpathian National University', '2003-07-08', 16, 'Female', 9),
                   ('Yurii Hrytsenko', 'National University of Kyiv-Mohyla Academy', '2001-10-03', 24, 'Male', 5),
                   ('Viktoria Kuzmenko', 'Zaporizhzhia National University', '2002-02-27', 9, 'Female', 6),
                   ('Bohdan Petrenko', 'Poltava National Technical University', '2000-12-21', 19, 'Male', NULL),
                   ('Natalia Horobets', 'V. O. Sukhomlynskyi Mykolaiv National University', '2002-03-05', 31, 'Female',
                    3),
                   ('Roman Yaremchuk', 'Uzhhorod National University', '2001-06-14', 26, 'Male', NULL) 
        `);


        await client.query(`
            INSERT INTO research_papers (paper_title, conference, publish_date)
            VALUES ('Design', 'A', '2025-05-05'),
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
        `);


        await client.query(`
            INSERT INTO author_paper (author_id, paper_id)
            VALUES (1, 1),
                   (1, 2),
                   (2, 3),
                   (2, 4),
                   (3, 5),
                   (3, 6),
                   (4, 7),
                   (4, 8),
                   (5, 9),
                   (5, 10),
                   (6, 11),
                   (6, 12),
                   (7, 13),
                   (7, 14),
                   (8, 15),
                   (8, 16),
                   (9, 17),
                   (9, 18),
                   (10, 19),
                   (10, 20),
                   (11, 21),
                   (11, 22),
                   (12, 23),
                   (12, 24),
                   (13, 25),
                   (13, 26),
                   (14, 27),
                   (14, 28),
                   (15, 29),
                   (15, 30) 
        `);

        console.log("Database setup completed successfully.");
    } catch (err) {
        console.error("Error setting up database:", err);
    } finally {
        await client.end();
    }
}

setupDatabase();
