

const express = require('express')
const app = express()

    app.get('/', (req, res) => {
  res.send(`Ready to Uptime!`);
});

app.listen(3000, () => {
 console.log("^⁠_⁠^ : Express Working")
});

require("dotenv").config();
const { Bot } = require("./handler/client");
const { TOKEN } = require("./Config/bot");

const client = new Bot();

module.exports = client;

client.build(TOKEN);


// For Handling Error ---------------------------------

// process.on("unhandledRejection", (reason, p) => {
//         console.log("[Error_Handling] :: Unhandled Rejection/Catch");
//         console.log(reason, p);
// });
// process.on("uncaughtException", (err, origin) => {
//         console.log(" [Error_Handling] :: Uncaught Exception/Catch");
//         console.log(err, origin);
// });
// process.on("uncaughtExceptionMonitor", (err, origin) => {
//         console.log(" [Error_Handling] :: Uncaught Exception/Catch (MONITOR)");
//         console.log(err, origin);
// });
