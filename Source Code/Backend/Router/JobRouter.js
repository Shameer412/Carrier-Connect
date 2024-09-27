// Routes/JobRoutes.js

const express = require("express");
const JobRouter = express.Router();

const JobController = require("../Controller/JobController");
const { checkJobInput } = require("../Validation/JobDataRules");
const { inputValidationMiddleware } = require("../Validation/ValidationMiddleware");

const { userAuthorizationHandler } = require("./../Middleware/UserAuthorizationMiddleware");

JobRouter.route("/")
    .get(JobController.getAllJobs)
    .post(
        userAuthorizationHandler(["recruiter", "admin"]),
        checkJobInput,
        inputValidationMiddleware,
        JobController.addJob
    )
    .delete(
        userAuthorizationHandler(["recruiter", "admin"]),
        JobController.deleteAllJobs
    );

JobRouter.get("/my-jobs", JobController.getMyJobs);

JobRouter.get("/admin-jobs", userAuthorizationHandler("admin"), JobController.getAdminJobs);

JobRouter.route("/:id")
    .get(JobController.getSingleJob)
    .patch(
        userAuthorizationHandler(["recruiter", "admin"]),
        checkJobInput,
        inputValidationMiddleware,
        JobController.updateSingleJob
    )
    .delete(
        userAuthorizationHandler(["recruiter", "admin"]),
        JobController.deleteSingleJob
    );
    
JobRouter.put("/accept/:id", userAuthorizationHandler("admin"), JobController.acceptJob);
JobRouter.put("/reject/:id", userAuthorizationHandler("admin"), JobController.rejectJob);

module.exports = JobRouter;
