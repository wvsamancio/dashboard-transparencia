const userModel = require("../models/userModel");

const getAll = async (req, res) => {
  const users = await userModel.getAll();
  return res.status(200).json(users);
};

const create = async (req, res) => {
  const { name, email, password } = req.body;
  await userModel.create(name, email, password);
  return res.status(201).json();
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { name, email } = await userModel.findById(id);
  return res.status(200).json({ name, email });
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  await userModel.deleteById(id);
  return res.status(204).json();
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  await userModel.updateById(id, name, email, password);
  return res.status(204).json();
};

module.exports = {
  getAll,
  create,
  deleteById,
  updateById,
  findById,
};
