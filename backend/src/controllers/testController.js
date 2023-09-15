// const client = require('../models/connectionMongo');

//  const runQuery = async (req, res) => {
//   try {
//     await client.connect();

//     const databaseName = 'dashboard'; // Replace with your database name
//     const collectionName = 'content'; // Replace with your collection name

//     const condition = { "receita": "IRRF" };

//     const pipeline = [
//       {
//         $match: {
//           "data": {
//             $elemMatch: condition
//           }
//         }
//       },
//       {
//         $project: {
//         "category": 1,
//           "filteredData": {
//             $filter: {
//               input: "$data",
//               as: "item",
//               cond: { $eq: ["$$item.receita", "IRRF"] }
//             }
//           }
//         }
//       }
//     ];

//     const database = client.db(databaseName);
//     const collection = database.collection(collectionName);

//     const result = await collection.aggregate(pipeline).toArray();

//     return res.status(200).json(result);
//   } finally {
//     await client.close();
//   }
// }

// module.exports = { runQuery };
