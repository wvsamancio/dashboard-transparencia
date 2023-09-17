const { connectionMongoDb } = require("./connection");

const database = "dashboard";

const getContents = async () => {
  const db = await connectionMongoDb.connect();
  const contents = await db
    .db(database)
    .collection("contents")
    .find()
    .toArray();
  return contents;
};

const dynamicQuery = async (query) => {
  const db = await connectionMongoDb.connect();
  const contents = await db
    .db(database)
    .collection("contents")
    .aggregate(query)
    .toArray();
  return contents;
};

module.exports = {
  getContents,
  dynamicQuery,
};
