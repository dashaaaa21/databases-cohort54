import { client } from './database.js';

async function exercise3Joins() {
    try {
        await client.connect();

        const mentorQuery = `
            SELECT a.author_name AS author,
                   m.author_name AS mentor
            FROM authors a
                     LEFT JOIN authors m
                               ON a.mentor = m.author_id
            ORDER BY a.author_id;
        `;
        const mentorResult = await client.query(mentorQuery);
        console.log("Authors and their mentors:");
        console.table(mentorResult.rows);

        const papersQuery = `
            SELECT a.author_id,
                   a.author_name,
                   a.university,
                   a.date_of_birth,
                   a.h_index,
                   a.gender,
                   a.mentor,
                   rp.paper_title
            FROM authors a
                     LEFT JOIN author_paper ap
                               ON a.author_id = ap.author_id
                     LEFT JOIN research_papers rp
                               ON ap.paper_id = rp.paper_id
            ORDER BY a.author_id, rp.paper_id;
        `;

        const papersResult = await client.query(papersQuery);
        console.log("Authors and their papers:");
        console.table(papersResult.rows);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.end();
    }
}

exercise3Joins();
