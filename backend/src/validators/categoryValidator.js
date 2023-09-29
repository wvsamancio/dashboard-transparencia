const validateBody = (req, res, next) => {
  const { body } = req;
  if (body.name === undefined || body.name === "") {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (body.userEmail === undefined || body.userEmail === "") {
    return res.status(400).json({ message: '"userEmail" is required' });
  }
  next();
};

module.exports = {
  validateBody,
};
