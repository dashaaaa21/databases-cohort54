const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://daryna2003tk_db_user:GSjXhp3Z9lVpvTfD@cluster0.gvygkpr.mongodb.net/dbWeek4?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function totalPopulationByCountry(countryName) {
    try {
        await client.connect();
        const db = client.db("dbWeek4");
        const collection = db.collection("population");

        const cursor = collection.find({ Country: countryName });
        const populationByYear = {};

        await cursor.forEach(doc => {
            const year = doc.Year;
            const total = doc.M + doc.F;
            if (!populationByYear[year]) populationByYear[year] = 0;
            populationByYear[year] += total;
        });

        const result = Object.keys(populationByYear).sort().map(year => ({
            _id: parseInt(year),
            countPopulation: populationByYear[year]
        }));

        console.log(result);

    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

totalPopulationByCountry("Netherlands");
