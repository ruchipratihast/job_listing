const Job = require("../models/jobModel");

const createJob = async (req, res) => {
    try {
        const { companyName,title, location, skills, salary, description,logoUrl, locationPreference, jobType } = req.body;

        if (!companyName || !title || !location || !skills || !salary ||!description || !logoUrl) {
            return res.status(400).json({
                error: "Bad Request",
            });
        }

        jobDetails = new Job({
            companyName,
            title, 
            location,
            skills, 
            salary, 
            description,
            logoUrl, 
            locationPreference, 
            jobType,
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
        const { companyName,title, location, skills, salary, description,logoUrl, locationPreference, jobType } = req.body;

        const jobId = req.params.jobId;

        await Job.updateOne(
            { _id: jobId },
            {
                $set: {
                    companyName,
                    title, 
                    location,
                    skills, 
                    salary, 
                    description,
                    logoUrl, 
                    locationPreference, 
                    jobType
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
        const title = req.query.title || "";
        const skills = req.query.skills || "";

        let filter = {};

        //Reguler expression
        if(skills){
            let filterSkills = skills?.split(",");
            let filterSkillsRegex = [];
            for(var f of filterSkills){
                filterSkillsRegex.push(new RegExp('^' + f + '$', 'i'));
            }
            filter = { skills: { $in: [...filterSkillsRegex]} };
        }

        const jobList = await Job.find(
            {
                title: { $regex: title, $options: "i" },
                ...filter,
            }
        );

        res.json(jobList );
    } catch (error) {
        console.log(error);
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