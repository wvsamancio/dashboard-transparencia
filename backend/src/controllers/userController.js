const userModel = require("../models/userModel");

const getUsers = async (req, res) => {
  const users = await userModel.getUsers();
  return res.status(200).json(users);
};

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const emailExists = await userModel.findByEmail(email);
  if (emailExists) {
    return res.status(409).json({ message: "Email already registered" });
  }
  await userModel.create({ name, email, password });
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
  console.log(id);
  const { name, email, password } = req.body;
  await userModel.updateById(id, { name, email, password });
  return res.status(204).json();
};

module.exports = {
  getUsers,
  create,
  findById,
  deleteById,
  updateById,
};
