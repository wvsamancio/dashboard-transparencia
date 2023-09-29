const validateBody = (req, res, next) => {
  const { body } = req;
  const regex = /\S+@\S+\.\S+/;
  if (body.name === undefined || body.name === "") {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (body.email === undefined || body.email === "") {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (!regex.test(body.email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  if (body.password === undefined || body.password === "") {
    return res.status(400).json({ message: '"password" is required' });
  }
  next();
};

module.exports = {
  validateBody,
};
