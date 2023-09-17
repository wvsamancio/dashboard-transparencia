const express = require("express");

const router = express.Router();

const userController = require("./controllers/userController");
const userMiddleware = require("./middlewares/userMiddleware");

const importController = require("./controllers/importController");
const contentController = require("./controllers/contentController");

router.get("/users", userController.getAll);
router.post("/users", userMiddleware.validateBody, userController.create);
router.get("/users/:id", userController.findById);
router.delete("/users/:id", userController.deleteById);
router.put(
  "/users/:id",
  userMiddleware.validateBody,
  userController.updateById
);

router.post("/import", importController.importCsv);

router.get("/contents", contentController.getContents);
router.post("/contents", contentController.dynamicQuery);

module.exports = router;
