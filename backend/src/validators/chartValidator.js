const validateBody = (req, res, next) => {
  const { body } = req;
  if (body.category === undefined || body.category === "") {
    return res.status(400).json({ message: '"category" is required' });
  }
  if (body.name === undefined || body.name === "") {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (body.query === undefined || body.query === "") {
    return res.status(400).json({ message: '"query" is required' });
  }
  if (body.dashboard === undefined || body.dashboard === "") {
    return res.status(400).json({ message: '"dashboard" is required' });
  }
  if (body.userEmail === undefined || body.userEmail === "") {
    return res.status(400).json({ message: '"userEmail" is required' });
  }
  next();
};

module.exports = {
  validateBody,
};
