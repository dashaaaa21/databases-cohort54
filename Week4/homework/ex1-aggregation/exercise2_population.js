const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://daryna2003tk_db_user:GSjXhp3Z9lVpvTfD@cluster0.gvygkpr.mongodb.net/dbWeek4?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function continentPopulation(yearValue, ageValue) {
    try {
        await client.connect();
        const db = client.db("dbWeek4");
        const collection = db.collection("population");

        const results = await collection.aggregate([
            { $match: { Year: yearValue, Age: ageValue, Country: { $in: ["AFRICA", "ASIA", "EUROPE", "LATIN AMERICA AND THE CARIBBEAN", "NORTHERN AMERICA", "OCEANIA"] } } },
            { $project: { Country: 1, Year: 1, Age: 1, M: 1, F: 1, TotalPopulation: { $add: ["$M", "$F"] } } }
        ]).toArray();

        console.log(results);
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

continentPopulation(2020, "100+");
