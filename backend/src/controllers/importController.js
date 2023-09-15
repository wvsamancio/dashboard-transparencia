const fileService = require("../services/importService");

const importCsv = async (req, res) => {
  const { url, category, startPeriod, endPeriod, headerIndex } = req.body;
  const { filePath } = await fileService.downloadCsv({ csvFileURL: url });
  const separator = fileService.findCsvSeparator({ filePath, headerIndex });
  await fileService.readCsv({
    filePath,
    separator,
    category,
    startPeriod,
    endPeriod,
    headerIndex,
  });
  fileService.deleteFile({ filePath });
  return res.status(201).json();
};

module.exports = {
  importCsv,
};
