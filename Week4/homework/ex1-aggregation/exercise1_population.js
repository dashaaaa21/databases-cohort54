require('dotenv').config();
const { MongoClient } = require('mongodb');
const fs = require('fs');
const csv = require('csv-parser');

const DB_NAME = "databaseWeek4";
const COLLECTION_NAME = "population";

async function importCSV() {
    const client = new MongoClient(process.env.MONGO_URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);


        await collection.deleteMany({});
        console.log('Collection cleared');

        const results = [];
        
        return new Promise((resolve, reject) => {
            fs.createReadStream('population_pyramid_1950-2022.csv')
                .pipe(csv())
                .on('data', (data) => {

                    data.M = parseInt(data.M);
                    data.F = parseInt(data.F);
                    data.Year = parseInt(data.Year);
                    results.push(data);
                })
                .on('end', async () => {
                    try {
                        if (results.length > 0) {
                            await collection.insertMany(results);
                            console.log(`Data imported successfully: ${results.length} documents`);
                        }
                        await client.close();
                        resolve();
                    } catch (err) {
                        await client.close();
                        reject(err);
                    }
                })
                .on('error', async (err) => {
                    await client.close();
                    reject(err);
                });
        });
    } catch (err) {
        console.error('Import error:', err);
        await client.close();
        throw err;
    }
}

async function totalPopulationByCountry(countryName) {
    const client = new MongoClient(process.env.MONGO_URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        const results = await collection.aggregate([
            { $match: { Country: countryName } },
            {
                $group: {
                    _id: "$Year",
                    countPopulation: { $sum: { $add: ["$M", "$F"] } }
                }
            },
            { $sort: { _id: 1 } }
        ]).toArray();

        console.log(`\nTotal population for ${countryName}:`);
        console.log(JSON.stringify(results, null, 2));
        return results;

    } catch (err) {
        console.error('Error in totalPopulationByCountry:', err);
        return [];
    } finally {
        await client.close();
    }
}

async function continentPopulation(yearValue, ageValue) {
    const client = new MongoClient(process.env.MONGO_URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        const results = await collection.aggregate([
            {
                $match: {
                    Year: yearValue,
                    Age: ageValue,
                    Country: { 
                        $in: [
                            "AFRICA",
                            "ASIA", 
                            "EUROPE",
                            "LATIN AMERICA AND THE CARIBBEAN",
                            "NORTHERN AMERICA",
                            "OCEANIA"
                        ] 
                    }
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

        console.log(`\nContinent population for year ${yearValue}, age ${ageValue}:`);
        console.log(JSON.stringify(results, null, 2));
        return results;

    } catch (err) {
        console.error('Error in continentPopulation:', err);
        return [];
    } finally {
        await client.close();
    }
}

async function main() {
    try {
        // await importCSV();
        await totalPopulationByCountry("Netherlands");
        await continentPopulation(2020, "100+");
        
    } catch (err) {
        console.error('Main error:', err);
    }
}

main();