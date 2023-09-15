const { connectionMongoDb } = require("./connection");
const { ObjectId } = require("mongodb");

const database = "dashboard";

const getAll = async () => {
  const db = await connectionMongoDb.connect();
  const users = await db.db(database).collection("users").find().toArray();
  return users;
};

const create = async (name, email, password) => {
  const db = await connectionMongoDb.connect();
  await db
    .db(database)
    .collection("users")
    .insertOne({ name, email, password });
  return true;
};

const findById = async (id) => {
  const db = await connectionMongoDb.connect();
  const user = await db
    .db(database)
    .collection("users")
    .findOne({ _id: new ObjectId(id) });
  return user;
};

const deleteById = async (id) => {
  const db = await connectionMongoDb.connect();
  await db
    .db(database)
    .collection("users")
    .deleteOne({ _id: new ObjectId(id) });
  return true;
};

const updateById = async (id, name, email, password) => {
  const db = await connectionMongoDb.connect();
  await db
    .db(database)
    .collection("users")
    .updateOne({ _id: new ObjectId(id) }, { $set: { name, email, password } });
  return true;
};

module.exports = {
  getAll,
  create,
  deleteById,
  updateById,
  findById,
};
