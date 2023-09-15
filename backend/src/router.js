const express = require('express');

const router = express.Router();

const userController = require('./controllers/userController');
const userMiddleware = require('./middlewares/userMiddleware');

const importController = require('./controllers/importController');

router.get('/users', userController.getAll);
router.post('/users', userMiddleware.validateBody, userController.create);
router.get('/users/:id', userController.findById);
router.delete('/users/:id', userController.deleteById);
router.put('/users/:id', userMiddleware.validateBody, userController.updateById);

router.post('/import', importController.importCsv);

module.exports = router;