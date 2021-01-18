const express = require("express");
const { mailing } = require("../controllers/userController");
const router = express.Router();
const userController = require("../controllers/userController");

router
  .route("/")
  .get(userController.getAllUsers)
  
router
.route("/SearchByName/:name")
.get(userController.getUser)
router
  .route("/ById/:userId")
  .delete(userController.deleteUser)
  .put(userController.updateUser);




module.exports = router;
