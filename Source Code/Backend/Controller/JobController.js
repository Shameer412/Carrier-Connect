const JobModel = require("../Model/JobModel");
const ApplicationModel = require("../Model/ApplicationModel");
const createError = require("http-errors");
const mongoose = require("mongoose");

module.exports.getAdminJobs = async (req, res, next) => {
    try {
        const { status } = req.query;
        const filter = {};
        if (status && status !== 'all') {
            filter.status = status;
        }

        const result = await JobModel.find(filter)
            .populate("createdBy", "username email");
        if (result?.length) {
            res.status(200).json({
                status: true,
                result,
            });
        } else {
            res.status(200).json({
                status: false,
                message: "No jobs found for the selected filter",
            });
        }
    } catch (error) {
        next(createError(500, `Something went wrong: ${error.message}`));
    }
};

module.exports.getAllJobs = async (req, res, next) => {
    try {
        const filters = { ...req.query, status: 'approved' }; // Filter to only show approved jobs

        const excludeFields = ["sort", "page", "limit", "fields", "search"];
        excludeFields.forEach((field) => delete filters[field]);

        const queries = {};

        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            queries.sortBy = sortBy;
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            queries.fields = fields;
        }
        if (req.query.limit) {
            const limit = req.query.limit.split(",").join(" ");
            queries.limit = limit;
        }
        if (req.query.search) {
            const searchQuery = req.query.search;
            filters.$or = [
                {
                    company: {
                        $regex: new RegExp(".*" + searchQuery + ".*", "i"),
                    },
                },
                {
                    position: {
                        $regex: new RegExp(".*" + searchQuery + ".*", "i"),
                    },
                },
                {
                    jobStatus: {
                        $regex: new RegExp(".*" + searchQuery + ".*", "i"),
                    },
                },
                {
                    jobType: {
                        $regex: new RegExp(".*" + searchQuery + ".*", "i"),
                    },
                },
                {
                    jobLocation: {
                        $regex: new RegExp(".*" + searchQuery + ".*", "i"),
                    },
                },
            ];
        }
        if (req.query.page) {
            const page = Number(req.query.page || 1);
            const limit = Number(req.query.limit || 5);
            const skip = (page - 1) * limit;

            queries.skip = skip;
            queries.limit = limit;
            queries.page = page;
        }

        const { result, totalJobs, pageCount, page } = await getData(
            filters,
            queries
        );

        if (result.length !== 0) {
            res.status(200).json({
                status: true,
                result,
                totalJobs,
                currentPage: page,
                pageCount,
            });
        } else {
            next(createError(500, "Job List is empty"));
        }
    } catch (error) {
        next(createError(500, error.message));
    }
};

module.exports.getMyJobs = async (req, res, next) => {
    try {
        const result = await JobModel.find({
            createdBy: req.user._id,
        }).populate("createdBy", "username email status");
        
        if (result?.length) {
            res.status(200).json({
                status: true,
                result,
            });
        } else {
            res.status(400).json({
                message: "Job not found",
            });
        }
    } catch (error) {
        next(createError(500, `something wrong: ${error.message}`));
    }
};

const getData = async (filters, queries) => {
    let sortCriteria = {};

    if (queries.sortBy) {
        switch (queries.sortBy) {
            case "newest":
                sortCriteria = { createdAt: -1 };
                break;
            case "oldest":
                sortCriteria = { createdAt: 1 };
                break;
            case "a-z":
                sortCriteria = { position: 1 };
                break;
            case "z-a":
                sortCriteria = { position: -1 };
                break;
            default:
                // Default sorting criteria if none of the options match
                sortCriteria = { createdAt: -1 };
                break;
        }
    } else {
        // Default sorting criteria if sortBy parameter is not provided
        sortCriteria = { createdAt: -1 };
    }
    const result = await JobModel.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .sort(sortCriteria)
        .select(queries.fields);

    // it not depend on previous one, its document number will be based on filter passing here
    const totalJobs = await JobModel.countDocuments(filters);
    const pageCount = Math.ceil(totalJobs / queries.limit);
    return { result, totalJobs, pageCount, page: queries.page };
};

module.exports.getSingleJob = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            next(createError(400, "Invalid Job ID format"));
        }
        const result = await JobModel.findById(id);
        if (!result) {
            next(createError(500, "Job not found"));
        } else {
            res.status(200).json({
                status: true,
                result,
            });
        }
    } catch (error) {
        next(createError(500, `something wrong: ${error.message}`));
    }
};

module.exports.addJob = async (req, res, next) => {
    const jobData = req.body;
    try {
        const isJobExists = await JobModel.findOne({
            company: jobData.comapny,
        });
        if (isJobExists) {
            next(createError(500, "Job data already exist"));
        } else {
            jobData.createdBy = req?.user?._id;
            const newJob = new JobModel(jobData);
            const result = await newJob.save();

            res.status(201).json({
                status: true,
                result,
            });
        }
    } catch (error) {
        next(createError(500, `something wrong: ${error.message}`));
    }
};

module.exports.updateSingleJob = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            next(createError(400, "Invalid Job ID format"));
        }

        const job = await JobModel.findById(id);
        if (!job) {
            next(createError(500, "Job not found"));
        } else if (
            req.user.role !== "admin" &&
            job.createdBy.toString() !== req.user._id.toString()
        ) {
            next(createError(403, "Unauthorized to update this job"));
        } else {
            const updatedJob = await JobModel.findByIdAndUpdate(id, data, {
                new: true,
            });
            res.status(200).json({
                status: true,
                message: "Job Updated",
                result: updatedJob,
            });
        }
    } catch (error) {
        next(createError(500, `something wrong: ${error.message}`));
    }
};

module.exports.deleteSingleJob = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw createError(400, 'Invalid Job ID format');
        }

        const job = await JobModel.findById(id);
        if (!job) {
            throw createError(404, 'Job not found');
        }

        if (req.user.role !== 'admin' && job.createdBy.toString() !== req.user._id.toString()) {
            throw createError(403, 'Unauthorized to delete this job');
        }

        // Delete associated applications
        await ApplicationModel.deleteMany({ jobId: id });

        // Delete the job
        await JobModel.findByIdAndDelete(id);

        res.status(200).json({
            status: true,
            message: 'Job and associated applications deleted successfully',
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};


module.exports.deleteAllJobs = async (req, res, next) => {
    try {
        const result = await JobModel.deleteMany({});
        res.status(201).json({
            status: true,
            result,
        });
    } catch (error) {
        next(createError(500, `something wrong: ${error.message}`));
    }
};

// JobController.js

module.exports.acceptJob = async (req, res, next) => {
    const { id } = req.params;
    try {
        const job = await JobModel.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
        if (!job) {
            next(createError(404, "Job not found"));
        } else {
            res.status(200).json({ status: true, message: "Job approved", result: job });
        }
    } catch (error) {
        next(createError(500, `something wrong: ${error.message}`));
    }
};

module.exports.rejectJob = async (req, res, next) => {
    const { id } = req.params;
    try {
        const job = await JobModel.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
        if (!job) {
            throw createError(404, "Job not found");
        }

        // Delete associated applications
        await ApplicationModel.deleteMany({ jobId: id });

        res.status(200).json({
            status: true,
            message: "Job rejected",
            result: job,
        });
    } catch (error) {
        next(createError(500, `something wrong: ${error.message}`));
    }
};
