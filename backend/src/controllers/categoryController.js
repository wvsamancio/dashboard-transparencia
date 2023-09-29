const categoryModel = require("../models/categoryModel");

const getCategories = async (req, res) => {
  const categories = await categoryModel.getCategories();
  return res.status(200).json(categories);
};

const create = async (req, res) => {
  const { name, description, userEmail } = req.body;
  await categoryModel.create({ name, description, userEmail });
  return res.status(201).json();
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { name, description, userEmail } = await categoryModel.findById(id);
  return res.status(200).json({ name, description, userEmail });
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  await categoryModel.deleteById(id);
  return res.status(204).json();
};

module.exports = {
  getCategories,
  create,
  findById,
  deleteById,
};
