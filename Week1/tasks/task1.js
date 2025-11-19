const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'meetup',
    port: 5432,
});

async function setup() {
    await client.connect();

    try {
        await client.query(`DROP TABLE IF EXISTS Meeting CASCADE;`);
        await client.query(`DROP TABLE IF EXISTS Invitee CASCADE;`);
        await client.query(`DROP TABLE IF EXISTS Room CASCADE;`);

        await client.query(`
      CREATE TABLE Invitee (
        invitee_no SERIAL PRIMARY KEY,
        invitee_name VARCHAR(255) NOT NULL,
        invited_by VARCHAR(255)
      );
      CREATE TABLE Room (
        room_no SERIAL PRIMARY KEY,
        room_name VARCHAR(255) NOT NULL,
        floor_number INT
      );
      CREATE TABLE Meeting (
        meeting_no SERIAL PRIMARY KEY,
        meeting_title VARCHAR(255) NOT NULL,
        starting_time TIMESTAMP NOT NULL,
        ending_time TIMESTAMP NOT NULL,
        room_no INT NOT NULL REFERENCES Room(room_no)
      );
    `);

        await client.query(`
      INSERT INTO Invitee (invitee_name, invited_by) VALUES
      ('Dasha', 'Nastya'),
      ('Ola', 'Vlad'),
      ('Sasha', 'Katya'),
      ('Vadim', 'Dima'),
      ('Igor', 'Anya');

      INSERT INTO Room (room_name, floor_number) VALUES
      ('Marketing room', 1),
      ('Design room', 2),
      ('Frontend room', 3),
      ('Backend room', 4),
      ('Fullstack room', 5);

      INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES
      ('Discuss retargeting', '2025-08-30 09:00', '2025-08-30 10:00', 1),
      ('Report strategy', '2025-08-29 09:00', '2025-08-29 10:00', 2),
      ('Discuss landing', '2025-08-28 09:00', '2025-08-28 10:00', 3),
      ('Discuss authorization', '2025-08-27 09:00', '2025-08-27 10:00', 4),
      ('New app planning', '2025-08-26 09:00', '2025-08-26 10:00', 5);
    `);

        console.log('Tables created and data insertion completed!!!!!');
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

setup();