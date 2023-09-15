const mysql = require("mysql2/promise");
const { MongoClient } = require("mongodb");
require("dotenv").config();

// Set the debug namespace to 'mongodb' for the MongoDB driver

const connectionMySql = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const connectionMongoDb = new MongoClient(
  process.env.MONGODB_URI,
  { monitorCommands: true }
);

connectionMongoDb.on("commandStarted", (event) =>
  console.debug(JSON.stringify(event.command))
);
//connectionMongoDb.on('commandSucceeded', (event) => console.debug(event));
connectionMongoDb.on("commandFailed", (event) => console.debug(event));

module.exports = {
  connectionMySql,
  connectionMongoDb,
};
