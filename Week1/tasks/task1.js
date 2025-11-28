const {Client} = require('pg');

async function setup() {
    const client = new Client({
        host: 'localhost',
        user: 'hyfuser',
        password: 'hyfpassword',
        database: 'postgres',
        port: 5432,
    });

    try {
        await client.connect();

        await client.query(`CREATE DATABASE meetup;`);
        console.log('Database "meetup" created good');

    } catch (err) {
        if (err.code === '42P04') {
            console.log('Database "meetup" already exists');
        } else {
            console.error('Error creating database:', err);
            return;
        }
    } finally {
        await client.end();
    }

    const meetupClient = new Client({
        host: 'localhost',
        user: 'hyfuser',
        password: 'hyfpassword',
        database: 'meetup',
        port: 5432,
    });

    try {
        await meetupClient.connect();

        await meetupClient.query(`DROP TABLE IF EXISTS Meeting CASCADE;`);
        await meetupClient.query(`DROP TABLE IF EXISTS Invitee CASCADE;`);
        await meetupClient.query(`DROP TABLE IF EXISTS Room CASCADE;`);

        await meetupClient.query(`
            CREATE TABLE Invitee
            (
                invitee_no   SERIAL PRIMARY KEY,
                invitee_name VARCHAR(255) NOT NULL,
                invited_by   INTEGER,
                FOREIGN KEY (invited_by) REFERENCES Invitee (invitee_no)
            );

            CREATE TABLE Room
            (
                room_no      SERIAL PRIMARY KEY,
                room_name    VARCHAR(255) NOT NULL,
                floor_number INT
            );

            CREATE TABLE Meeting
            (
                meeting_no    SERIAL PRIMARY KEY,
                meeting_title VARCHAR(255) NOT NULL,
                starting_time TIMESTAMP    NOT NULL,
                ending_time   TIMESTAMP    NOT NULL,
                room_no       INT          NOT NULL,
                FOREIGN KEY (room_no) REFERENCES Room (room_no)
            );
        `);

        await meetupClient.query(`
            INSERT INTO Invitee (invitee_name, invited_by)
            VALUES
                ('Nastya', NULL),
                ('Dasha', 1),
                ('Vlad', NULL),
                ('Ola', 3),
                ('Katya', NULL),
                ('Sasha', 5),
                ('Dima', NULL),
                ('Vadim', 7),
                ('Anya', NULL),
                ('Igor', 9);
        `);


        await meetupClient.query(`
            INSERT INTO Room (room_name, floor_number)
            VALUES ('Marketing room', 1),
                   ('Design room', 2),
                   ('Frontend room', 3),
                   ('Backend room', 4),
                   ('Fullstack room', 5);
        `);

        await meetupClient.query(`
            INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
            VALUES ('Discuss retargeting', '2025-08-30 09:00', '2025-08-30 10:00', 1),
                   ('Report strategy', '2025-08-29 09:00', '2025-08-29 10:00', 2),
                   ('Discuss landing', '2025-08-28 09:00', '2025-08-28 10:00', 3),
                   ('Discuss authorization', '2025-08-27 09:00', '2025-08-27 10:00', 4),
                   ('New app planning', '2025-08-26 09:00', '2025-08-26 10:00', 5);
        `);

        console.log('Tables created and data inserted successfully!');

    } catch (err) {
        console.error('Error setting up tables or inserting data:', err);
    } finally {
        await meetupClient.end();
    }
}

setup();
