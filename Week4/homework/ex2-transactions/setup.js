const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://daryna2003tk_db_user:GSjXhp3Z9lVpvTfD@cluster0.gvygkpr.mongodb.net/dbWeek4?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function setup() {
    try {
        await client.connect();
        const db = client.db("dbWeek4");
        const accounts = db.collection("accounts");

        await accounts.deleteMany({});

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
        ]);

        console.log("Everything complete! Accounts created.");
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

module.exports = { setup };


if (require.main === module) setup();
