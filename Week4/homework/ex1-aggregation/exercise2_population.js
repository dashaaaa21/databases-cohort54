require('dotenv').config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function continentPopulation(yearValue, ageValue) {
    try {
        await client.connect();
        const db = client.db("databaseWeek4");
        const collection = db.collection("population");

        const results = await collection.aggregate([
            {
                $match: {
                    Year: yearValue,
                    Age: ageValue,
                    Country: { $in: ["AFRICA", "ASIA", "EUROPE", "LATIN AMERICA AND THE CARIBBEAN", "NORTHERN AMERICA", "OCEANIA"] }
                }
            },
            {
                $project: {
                    Country: 1,
                    Year: 1,
                    Age: 1,
                    M: 1,
                    F: 1,
                    TotalPopulation: { $add: ["$M", "$F"] }
                }
            }
        ]).toArray();

        console.log(results);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

continentPopulation(2020, "100+");
