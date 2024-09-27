const express = require("express");
const UserRouter = express.Router();
const UserController = require("../Controller/UserController");
const { checkRegisterInput, checkLoginInput, checkUserUpdateInput } = require("../Validation/UserDataRules");
const { inputValidationMiddleware } = require("../Validation/ValidationMiddleware");
const { userAuthorizationHandler } = require("../Middleware/UserAuthorizationMiddleware");

UserRouter.route("/")
    .get(userAuthorizationHandler("admin"), UserController.getAllUser)
    .delete(userAuthorizationHandler("admin"), UserController.deleteAllUser);

UserRouter.post("/login", checkLoginInput, inputValidationMiddleware, UserController.loginUser);

UserRouter.route("/:id")
    .get(UserController.getSingleUser)
    .patch(checkUserUpdateInput, inputValidationMiddleware, UserController.updateUser)
    .delete(userAuthorizationHandler("admin"), UserController.deleteUser);

module.exports = UserRouter;
