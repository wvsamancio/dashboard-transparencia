const contentModel = require("../models/contentModel");
const contentService = require("../services/contentService");

const getContents = async (req, res) => {
  const { category } = req.body;
  const contents = await contentModel.getContents({ category });
  return res.status(200).json(contents);
};

const dynamicQuery = async (req, res) => {
  const { query } = req.body;
  const contents = await contentService.dynamicQuery({ query });
  return res.status(200).json(contents);
};

module.exports = {
  getContents,
  dynamicQuery,
};
