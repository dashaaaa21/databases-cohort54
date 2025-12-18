require("dotenv/config");
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

async function transfer(from, to, amount, remark) {
    const session = client.startSession();

    try {
        await session.withTransaction(async () => {
            const db = client.db("dbWeek4");
            const accounts = db.collection("accounts");

            const accFrom = await accounts.findOne({ account_number: from }, { session });
            const accTo = await accounts.findOne({ account_number: to }, { session });

            if (!accFrom || !accTo) throw new Error("No account found");
            if (accFrom.balance < amount) throw new Error("Not enough money");

            const lastChangeFrom = accFrom.account_changes.at(-1)?.change_number || 0;
            const lastChangeTo = accTo.account_changes.at(-1)?.change_number || 0;

            await accounts.updateOne(
                { account_number: from },
                {
                    $inc: { balance: -amount },
                    $push: {
                        account_changes: {
                            change_number: lastChangeFrom + 1,
                            amount: -amount,
                            changed_date: new Date(),
                            remark
                        }
                    }
                },
                { session }
            );

            await accounts.updateOne(
                { account_number: to },
                {
                    $inc: { balance: amount },
                    $push: {
                        account_changes: {
                            change_number: lastChangeTo + 1,
                            amount: amount,
                            changed_date: new Date(),
                            remark
                        }
                    }
                },
                { session }
            );
        });

        console.log(`Transferred ${amount} from ${from} to ${to}`);
    } catch (err) {
        console.error("Transaction aborted:", err);
    } finally {
        await session.endSession();
        await client.close();
    }
}

module.exports = { transfer };
