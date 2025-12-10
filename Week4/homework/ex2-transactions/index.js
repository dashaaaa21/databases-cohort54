const { setup } = require("./setup");
const { transfer } = require("./transfer");

async function start() {
    await setup();

    await transfer(101, 102, 1000, "Test transfer");
}

start();
