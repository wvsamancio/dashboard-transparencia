const axios = require("axios");
const fs = require("fs");

const importModel = require("../models/importModel");

const downloadCsv = async ({ csvFileURL }) => {
  const localFilePath = `./tmp/${+new Date()}.csv`;

  try {
    const response = await axios.get(csvFileURL, { responseType: "stream" });
    const writer = fs.createWriteStream(localFilePath);

    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    console.log(`CSV file downloaded to ${localFilePath}`);
    return { filePath: localFilePath };
  } catch (error) {
    console.error("Error downloading CSV:", error);
    throw error;
  }
};

const findCsvSeparator = ({ filePath, headerIndex }) => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const lines = fileContent.split("\n");

  // Skip lines until headerIndex
  for (let i = 0; i < headerIndex - 1; i++) {
    if (lines.length > 1) {
      lines.shift();
    } else {
      throw new Error("Header index out of bounds");
    }
  }

  const line = lines[0];

  // Check for common separators
  const separators = [",", ";", "\t"];

  for (const separator of separators) {
    if (line.includes(separator)) {
      return separator;
    }
  }

  throw new Error("No separator found");
};

const createSubtitle = ({ headerRow, separator }) => {
  const subtitle = {};
  const keys = headerRow.split(separator);

  for (let i = 0; i < keys.length; i++) {
    // Remove special characters and create a key without spaces
    const key = keys[i]
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replaceAll(" ", "_")
      .toLowerCase();
    subtitle[key] = keys[i];
  }

  return subtitle;
};

const readCsv = async ({
  filePath,
  separator,
  category,
  startPeriod,
  endPeriod,
  headerIndex,
}) => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const lines = fileContent.split("\n");

  const headerRow = lines[headerIndex - 1];
  const subtitle = createSubtitle({ headerRow, separator });
  const headerKeys = Object.keys(subtitle);

  let importedRows = 0;
  const document = {};

  document.category = category;
  document.startPeriod = startPeriod;
  document.endPeriod = endPeriod;

  const data = [];

  for (let i = headerIndex; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    const fields = line.split(separator);

    const row = {};

    for (let j = 0; j < headerKeys.length; j++) {
      const key = headerKeys[j];
      row[key] = fields[j].replaceAll('"', "");
    }

    importedRows++;
    data.push(row);
  }

  document.importedRows = importedRows;
  document.data = data;
  document.subtitle = subtitle;

  await importModel.importCsv(document);
};

const deleteFile = ({ filePath }) => {
  fs.unlinkSync(filePath);
};

module.exports = {
  downloadCsv,
  findCsvSeparator,
  readCsv,
  deleteFile,
};
