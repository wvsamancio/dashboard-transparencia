const { connectionMongoDb } = require("./connection");
const { ObjectId } = require("mongodb");

const database = "dashboard";

const getCharts = async () => {
  const db = await connectionMongoDb.connect();
  const charts = await db.db(database).collection("charts").find().toArray();
  return charts;
};

const create = async ({
  category,
  name,
  description,
  query,
  dashboard,
  userEmail,
}) => {
  const db = await connectionMongoDb.connect();
  await db
    .db(database)
    .collection("charts")
    .insertOne({ category, name, description, query, dashboard, userEmail });
  return true;
};

const findById = async (id) => {
  const db = await connectionMongoDb.connect();
  const chart = await db
    .db(database)
    .collection("charts")
    .findOne({ _id: new ObjectId(id) });
  return chart;
};

const deleteById = async (id) => {
  const db = await connectionMongoDb.connect();
  await db
    .db(database)
    .collection("charts")
    .deleteOne({ _id: new ObjectId(id) });
  return true;
};

const updateById = async (
  id,
  { category, name, description, query, dashboard, userEmail }
) => {
  const db = await connectionMongoDb.connect();
  await db
    .db(database)
    .collection("charts")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { category, name, description, query, dashboard, userEmail } }
    );
  return true;
};

module.exports = {
  getCharts,
  create,
  deleteById,
  findById,
  updateById,
};
