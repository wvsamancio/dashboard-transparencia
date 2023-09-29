const chartModel = require("../models/chartModel");

const getCharts = async (req, res) => {
  const charts = await chartModel.getCharts();
  return res.status(200).json(charts);
};

const create = async (req, res) => {
  const { category, name, description, query, dashboard, userEmail } = req.body;
  await chartModel.create({
    category,
    name,
    description,
    query,
    dashboard,
    userEmail,
  });
  return res.status(201).json();
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { category, name, description, query, dashboard, userEmail } =
    await chartModel.findById(id);
  return res
    .status(200)
    .json({ category, name, description, query, dashboard, userEmail });
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  await chartModel.deleteById(id);
  return res.status(204).json();
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { category, name, description, query, dashboard, userEmail } = req.body;
  await chartModel.updateById(id, {
    category,
    name,
    description,
    query,
    dashboard,
    userEmail,
  });
  return res.status(204).json();
};

module.exports = {
  getCharts,
  create,
  findById,
  updateById,
  deleteById,
};
