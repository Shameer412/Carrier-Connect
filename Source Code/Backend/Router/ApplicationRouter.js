const express = require("express");
const ApplicationRouter = express.Router();

// Controllers
const ApplicationController = require("../Controller/ApplicationController");

// Middlewares
const { checkInput } = require("../Validation/ApplicationDataRules");
const {
    inputValidationMiddleware,
} = require("../Validation/ValidationMiddleware");
const {
    userAuthorizationHandler,
} = require("./../Middleware/UserAuthorizationMiddleware");

// Authentication routes

ApplicationRouter.get(
    "/applicant-jobs",
    userAuthorizationHandler("user"),
    ApplicationController.getCandidateAppliedJobs
);

ApplicationRouter.post(
    "/apply",
    checkInput,
    inputValidationMiddleware,
    userAuthorizationHandler("user"),
    ApplicationController.applyInJob
);

ApplicationRouter.get(
    "/admin-jobs",
    userAuthorizationHandler("admin"),
    ApplicationController.getAllJobApplications
);

ApplicationRouter.get(
    "/recruiter-jobs",
    userAuthorizationHandler("recruiter"),
    ApplicationController.getAcceptedRejectedApplications
);

ApplicationRouter.patch(
    "/:id",
    userAuthorizationHandler("admin"),
    ApplicationController.updateJobStatus
);
// In your ApplicationRouter or similar file
ApplicationRouter.delete(
    "/:id",
    userAuthorizationHandler("user"), // Ensure user is authorized
    ApplicationController.deleteJobApplication
);

module.exports = ApplicationRouter;
