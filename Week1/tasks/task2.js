const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'world',
    port: 5432,
});

const queries = [
    {
        question: "What are the names of countries with population greater than 8 million?",
        query: `
            SELECT name, population 
            FROM country 
            WHERE population > 8000000 
            ORDER BY population DESC
        `
    },
    {
        question: "What are the names of countries that have 'land' in their names?",
        query: `
            SELECT name 
            FROM country 
            WHERE name ILIKE '%land%' 
            ORDER BY name
        `
    },
    {
        question: "What are the names of the cities with population in between 500,000 and 1 million?",
        query: `
            SELECT name, population 
            FROM city 
            WHERE population BETWEEN 500000 AND 1000000 
            ORDER BY population
        `
    },
    {
        question: "What's the name of all the countries on the continent 'Europe'?",
        query: `
            SELECT name 
            FROM country 
            WHERE continent = 'Europe' 
            ORDER BY name
        `
    },
    {
        question: "List all the countries in the descending order of their surface areas.",
        query: `
            SELECT name, surfacearea 
            FROM country 
            ORDER BY surfacearea DESC
        `
    },
    {
        question: "What are the names of all the cities in the Netherlands?",
        query: `
            SELECT c.name, c.population 
            FROM city c 
            JOIN country co ON c.countrycode = co.code 
            WHERE co.name = 'Netherlands' 
            ORDER BY c.name
        `
    },
    {
        question: "What is the population of Rotterdam?",
        query: `
            SELECT population 
            FROM city 
            WHERE name = 'Rotterdam'
        `
    },
    {
        question: "What's the top 10 countries by Surface Area?",
        query: `
            SELECT name, surfacearea 
            FROM country 
            ORDER BY surfacearea DESC 
            LIMIT 10
        `
    },
    {
        question: "What's the top 10 most populated cities?",
        query: `
            SELECT name, population 
            FROM city 
            ORDER BY population DESC 
            LIMIT 10
        `
    },
    {
        question: "What is the population number of the world?",
        query: `
            SELECT SUM(population) AS world_population 
            FROM country
        `
    }
];

async function runQueries() {
    try {
        await client.connect();

        for (const item of queries) {
            const res = await client.query(item.query);
            console.log(item.question);
            console.table(res.rows);
        }

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await client.end();
    }
}

runQueries();
