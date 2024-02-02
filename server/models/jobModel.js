const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    logoUrl:{
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    locationPreference: {
        type: String,
        default: "office",
    },
    jobType: {
        type: String,
        default: "full-time",
    },
    skills: {
        type: [String],
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    refUserId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
});

module.exports = mongoose.model("Job", jobSchema);