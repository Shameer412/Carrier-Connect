const { check } = require('express-validator');
const mongoose = require('mongoose');
const { STATUS } = require('../Utils/ApplicationConstants');

exports.checkInput = [
    check('applicantId')
        .trim()
        .notEmpty()
        .withMessage('Application must have an Applicant ID')
        .custom((applicantId) => {
            if (!mongoose.Types.ObjectId.isValid(applicantId)) {
                throw new Error('Invalid Applicant ID');
            }
            return true;
        }),
    check('recruiterId')
        .trim()
        .notEmpty()
        .withMessage('Application must have a Recruiter ID')
        .custom((recruiterId) => {
            if (!mongoose.Types.ObjectId.isValid(recruiterId)) {
                throw new Error('Invalid Recruiter ID');
            }
            return true;
        }),
    check('jobId')
        .trim()
        .notEmpty()
        .withMessage('Application must have a Job ID')
        .custom((jobId) => {
            if (!mongoose.Types.ObjectId.isValid(jobId)) {
                throw new Error('Invalid Job ID');
            }
            return true;
        }),
    check('status')
        .isIn(Object.values(STATUS))
        .withMessage('Invalid job status'),
    check('dateOfApplication')
        .notEmpty()
        .withMessage('Application Date is required')
        .isISO8601()
        .withMessage('Invalid date format. Please provide a valid date.'),
    check('resume')
        .notEmpty()
        .withMessage("Applicant's Resume is required")
        .isURL()
        .withMessage('Invalid URL. Please provide a valid URL.'),
];
