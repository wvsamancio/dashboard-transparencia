const { connectionMongoDb } = require("./connection");
const { ObjectId } = require("mongodb");

const database = "dashboard";

const getCategories = async () => {
  const db = await connectionMongoDb.connect();
  const categories = await db
    .db(database)
    .collection("categories")
    .find()
    .toArray();
  return categories;
};

const create = async ({ name, description, userEmail }) => {
  const db = await connectionMongoDb.connect();
  const result = await db
    .db(database)
    .collection("categories")
    .insertOne({ name, description, userEmail });
  return result;
};

const findById = async (id) => {
  const db = await connectionMongoDb.connect();
  const category = await db
    .db(database)
    .collection("categories")
    .findOne({ _id: new ObjectId(id) });
  return category;
};

const deleteById = async (id) => {
  const db = await connectionMongoDb.connect();
  await db
    .db(database)
    .collection("categories")
    .deleteOne({ _id: new ObjectId(id) });
  return true;
};

module.exports = {
  getCategories,
  create,
  findById,
  deleteById,
};
