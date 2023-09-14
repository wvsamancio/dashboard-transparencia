const express = require('express');

const router = express.Router();

const userController = require('./controllers/userController');
const userMiddleware = require('./middlewares/userMiddleware');


router.get('/users', userController.getAll);
router.post('/users', userMiddleware.validateBody, userController.create);
router.delete('/users/:id', userController.deleteById);
router.put('/users/:id', userMiddleware.validateBody, userController.updateById);

module.exports = router;