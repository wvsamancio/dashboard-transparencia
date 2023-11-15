const { connectionMongoDb } = require("./connection");

const database = "dashboard";

function getObjectSizeInBytes(obj) {
  // Convert the object to a JSON string
  const jsonString = JSON.stringify(obj);

  // Calculate the byte size of the JSON string
  const bytes = new TextEncoder().encode(jsonString).length;

  return bytes;
}

//17825792
//12292619

const importCsv = async (document) => {
  const db = await connectionMongoDb.connect();
  // await db.db(database).collection("contents").insertOne(document);

  const chunkSize = 10_000;
  const documentCopy = JSON.parse(JSON.stringify(document));
  documentCopy.data = [];

  // const response = await db.db(database).collection("contents").insertOne(documentCopy);

  for (let i = 0; i < document.data.length; i += chunkSize) {
    const chunk = document.data.slice(i, i + chunkSize);
    
    // console.log({
    //   chunckSize: chunk.length,
    //   bytes: getObjectSizeInBytes(chunk),
    //   i: i,
    // });

    // await db.db(database).collection("contents").updateOne({ _id: response.insertedId },
    //   { $push: { data: chunk } });

    await db.db(database).collection("contents").insertOne({ ...documentCopy, data: chunk });
  }

  return true;
};

module.exports = {
  importCsv,
};

