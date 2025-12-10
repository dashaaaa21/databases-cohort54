const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://daryna2003tk_db_user:GSjXhp3Z9lVpvTfD@cluster0.gvygkpr.mongodb.net/dbWeek4?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function transfer(from, to, amount, remark) {
    try {
        await client.connect();
        const db = client.db("dbWeek4");
        const accounts = db.collection("accounts");

        const accFrom = await accounts.findOne({ account_number: from });
        const accTo = await accounts.findOne({ account_number: to });

        if (!accFrom || !accTo)
            return console.log("No account");
        if (accFrom.balance < amount)
            return console.log("Not enough money");

        const lastChangeFrom = accFrom.account_changes.at(-1)?.change_number || 0;
        const lastChangeTo = accTo.account_changes.at(-1)?.change_number || 0;

        await accounts.updateOne({ account_number: from }, {
            $inc: { balance: -amount },
            $push: {
                account_changes: {
                    change_number: lastChangeFrom + 1,
                    amount: -amount,
                    changed_date: new Date(),
                    remark
                }
            }
        });

        await accounts.updateOne({ account_number: to }, {
            $inc: { balance: amount },
            $push: {
                account_changes: {
                    change_number: lastChangeTo + 1,
                    amount: amount,
                    changed_date: new Date(),
                    remark
                }
            }
        });

        console.log(`Transferred ${amount} from ${from} to ${to}`);
    } finally {
        await client.close();
    }
}

module.exports = { transfer };
