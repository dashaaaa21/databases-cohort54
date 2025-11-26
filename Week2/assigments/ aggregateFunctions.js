import { client } from './database.js';

async function exercise4Aggregates() {
    try {
        await client.connect();


        const papersCountQuery = `
            SELECT rp.paper_title,
                   COUNT(ap.author_id) AS author_count
            FROM research_papers rp
            LEFT JOIN author_paper ap
                   ON rp.paper_id = ap.paper_id
            GROUP BY rp.paper_title
            ORDER BY rp.paper_title;
        `;
        const papersCountResult = await client.query(papersCountQuery);
        console.table(papersCountResult.rows);


        const femalePapersQuery = `
            SELECT COUNT(ap.paper_id) AS total_papers_by_female_authors
            FROM authors a
            JOIN author_paper ap
                  ON a.author_id = ap.author_id
            WHERE a.gender = 'Female';
        `;
        const femalePapersResult = await client.query(femalePapersQuery);
        console.table(femalePapersResult.rows);


        const avgHIndexQuery = `
            SELECT university,
                   AVG(h_index) AS avg_h_index
            FROM authors
            GROUP BY university
            ORDER BY university;
        `;
        const avgHIndexResult = await client.query(avgHIndexQuery);
        console.table(avgHIndexResult.rows);


        const papersByUniversityQuery = `
            SELECT a.university,
                   COUNT(ap.paper_id) AS total_papers
            FROM authors a
            LEFT JOIN author_paper ap
                   ON a.author_id = ap.author_id
            GROUP BY a.university
            ORDER BY a.university;
        `;
        const papersByUniversityResult = await client.query(papersByUniversityQuery);
        console.table(papersByUniversityResult.rows);


        const hIndexMinMaxQuery = `
            SELECT university,
                   MIN(h_index) AS min_h_index,
                   MAX(h_index) AS max_h_index
            FROM authors
            GROUP BY university
            ORDER BY university;
        `;

        const hIndexMinMaxResult = await client.query(hIndexMinMaxQuery);
        console.table(hIndexMinMaxResult.rows);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.end();
    }
}

exercise4Aggregates();
