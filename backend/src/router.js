const express = require("express");

const router = express.Router();

// Controllers
const userController = require("./controllers/userController");
const importController = require("./controllers/importController");
const contentController = require("./controllers/contentController");
const categoryController = require("./controllers/categoryController");
const chartController = require("./controllers/chartController");
const authController = require("./controllers/authController");
const forgotController = require("./controllers/forgotController");

// Validators
const userValidator = require("./validators/userValidator");
const categoryValidator = require("./validators/categoryValidator");
const chartValidator = require("./validators/chartValidator");

// auth
router.get("/me", authController.authenticationUser);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// forgot
router.post("/forgot", forgotController.forgot);

// users
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.findById);
router.post("/register", userValidator.validateBody, userController.create);
router.delete("/users/:id", userController.deleteById);
router.put("/users/:id", userValidator.validateBody, userController.updateById);
// router.post("/token", userController.createToken);

// import
router.post("/import", importController.importCsv);

// contents
router.post("/contents", contentController.getContents);
router.post("/preview", contentController.dynamicQuery);

// categories
router.get("/categories", categoryController.getCategories);
router.get("/categories/:id", categoryController.findById);
router.post(
  "/categories",
  categoryValidator.validateBody,
  categoryController.create
);
router.delete("/categories/:id", categoryController.deleteById);

// charts
router.get("/charts", chartController.getCharts);
router.get("/charts/:id", chartController.findById);
router.post("/charts", chartValidator.validateBody, chartController.create);
router.delete("/charts/:id", chartController.deleteById);
router.put(
  "/charts/:id",
  chartValidator.validateBody,
  chartController.updateById
);

module.exports = router;
