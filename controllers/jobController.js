const Job = require("../models/jobModel");
const mongoose = require('mongoose');

const createJob = async (req, res) => {
    try {
        const { companyName, logoUrl, title, description } = req.body;

        if (!companyName || !logoUrl || !title || !description) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        jobDetails = new Job({
            companyName,
            logoUrl,
            title,
            description,
            refUserId: req.body.userId,
        });

        await jobDetails.save();

        res.json({ message: "New job created successfully" });
    } catch (error) {
        console.log(error);
    }
}

const editJob = async (req, res) => {
    try {
        const { companyName, logoUrl, title, description } = req.body;

        const jobId = req.params.jobId;

        if (!companyName || !logoUrl || !title || !description) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        await Job.updateOne(
            { _id: jobId },
            {
                $set: {
                    companyName,
                    logoUrl,
                    title,
                    description,
                },
            }
        );

        res.json({ message: "New job updated successfully" });
    } catch (error) {
        console.log(error);
    }
}

// Controller to show the detail description of job post
const jobDescription = async (req, res) => {
    try {
        const jobId = req.params.jobId;

        if (!jobId) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        const jobDetails = await Job.findById(jobId);
        res.json({ data: jobDetails });

    } catch (error) {
        console.log(error);
    }
}

const deleteJob = async (req, res) => {
    try {
        const id = req.params.jobId;

        try {
            await Job.findByIdAndDelete(id);
            res.json({ message: `User with id ${id} successfully deleted` });
 
        } catch (error) {
            res.status(500).json({ message: `Error deleting user: ${error.message}` });
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createJob,
    editJob,
    jobDescription,
    deleteJob,
}