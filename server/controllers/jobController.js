const Job = require("../models/jobModel");

const createJob = async (req, res) => {
    try {
        const { companyName, logoUrl, title, description } = req.body;

        if (!companyName || !logoUrl || !title || !description) {
            return res.status(400).json({
                error: "Bad Request",
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
        return res.status(200).json({ message: "New job created successfully" });
        
    } catch (error) {
        res.status(500).json({ message: 'Error creating jobs' });
    }
}

const editJob = async (req, res) => {
    try {
        const { companyName, logoUrl, title, description } = req.body;

        const jobId = req.params.jobId;

        if (!companyName || !logoUrl || !title || !description) {
            return res.status(400).json({
                error: "Bad Request",
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

        return res.status(200).json({ message: "job updated successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Error updating jobs' });
    }
}

// Controller to show the detail description of job post
const jobDescription = async (req, res) => {
    try {
        const jobId = req.params.jobId;

        if (!jobId) {
            return res.status(400).json({
                error: "Bad Request",
            });
        }

        const jobDetails = await Job.findById(jobId);
        return res.status(200).json({ data: jobDetails });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs Description' });
    }
}

//Controller to get all the jobs with filters based on skills and job title
const allJob = async (req, res) => {
    try {
        const { skills, title } = req.query;

        let query = {};

        if (skills) {
            query = {
                $and: [
                    query,
                    { skills: { $in: skills.split(',') } },
                ],
            };
        }

        if (title) {
            query = {
                $and: [
                    query,
                    { title: { $regex: title, $options: "i" } },
                ],
            };
        }

        const jobs = await Job.find(query);
        return res.status(200).json(jobs);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs' });
    }
}

const deleteJob = async (req, res) => {
    try {
        const id = req.params.jobId;

        try {
            await Job.findByIdAndDelete(id);
            res.status(200).json({ message: "successfully deleted" });

        } catch (error) {
            res.status(500).json({ message: `Error deleting job: ${error.message}` });
        }

    } catch (error) {
        res.status(500).json({ message: 'Error deleting jobs' });
    }
}

module.exports = {
    createJob,
    editJob,
    jobDescription,
    allJob,
    deleteJob,
}