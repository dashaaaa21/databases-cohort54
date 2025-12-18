require("dotenv/config");
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function setup() {
    const session = client.startSession();

    try {
        await client.connect();

        await session.withTransaction(async () => {
            const db = client.db("dbWeek4");
            const accounts = db.collection("accounts");

            await accounts.deleteMany({}, { session });

            await accounts.insertMany([
                {
                    account_number: 101,
                    balance: 5000,
                    account_changes: []
                },
                {
                    account_number: 102,
                    balance: 2000,
                    account_changes: []
                }
            ], { session });
        });

        console.log("Setup complete! Accounts created.");
    } catch (err) {
        console.error(err);
    } finally {
        await session.endSession();
        await client.close();
    }
}

module.exports = { setup };

if (require.main === module) setup();
