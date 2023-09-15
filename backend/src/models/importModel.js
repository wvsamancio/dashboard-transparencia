const { connectionMongoDb } = require("./connection");

const database = "dashboard";

const importCsv = async (document) => {
  const db = await connectionMongoDb.connect();
  await db.db(database).collection("contents").insertOne(document);
  return true;
};

module.exports = {
  importCsv
};
