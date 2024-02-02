import React, { useState} from "react";
import { useLocation } from "react-router-dom";
import styles from "./JobPostComponent.module.css";
import { createJobPost, updateJobPost } from "../../apis/job";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function JobPostComponent() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [isEditExistingJobPost] = useState(false || state?.edit);
    const [formData, setFormData] = useState({
        companyName: "" || state?.data?.companyName,
        title: "" || state?.data?.title,
        location: "" || state?.data?.location,
        skills: "" || state?.data?.skills,
        salary: "" || state?.data?.salary,
        description: "" || state?.data?.description,
        locationPreference: "" || state?.data?.locationPreference,
        jobType: "" || state?.data?.jobType,
        logoUrl: "" || state?.data?.logoUrl,
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        
        if (!formData.companyName || !formData.description || !formData.jobType || !formData.location || !formData.locationPreference ||!formData.logoUrl|| !formData.salary || !formData.skills || !formData.title) {
            return alert("Please Fill All The Fields!")
        }

        if (isEditExistingJobPost) {
            if (!state.id) return;
            await updateJobPost(state.id, {
                ...formData,
                skills: formData.skills,
            });
            toast.success("Job Updated Successfully !")
            navigate("/");
        } else {
            await createJobPost({
                ...formData,
                skills: formData.skills.split(" "),
            });
            toast.success("New Job Post is Added Successfully !")
            navigate("/");
        }
    };

    return (
        <form>
            <div className={styles.container}>
                <h1 className={styles.h1}>
                    {isEditExistingJobPost ? <>Edit</> : <>Add</>} job description
                </h1>
                <div className={styles.jobForm}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="companyName">
                            Company Name:
                        </label>
                        <input
                            className={styles.input}
                            type="text"
                            name="companyName"
                            required={true}
                            value={formData?.companyName}
                            onChange={handleChange}
                            placeholder="Enter company name"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="title">
                            Title:
                        </label>
                        <input
                            className={styles.input}
                            type="text"
                            name="title"
                            required={true}
                            value={formData?.title}
                            onChange={handleChange}
                            placeholder="Enter Title"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="logoUrl">
                         Logo Url:
                        </label>
                        <input
                            className={styles.input}
                            type="text"
                            name="logoUrl"
                            required={true}
                            value={formData?.logoUrl}
                            onChange={handleChange}
                            placeholder="Enter Logo Url"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="skills">
                            Skills:
                        </label>
                        <input
                            className={styles.input}
                            type="text"
                            name="skills"
                            required={true}
                            value={formData?.skills}
                            onChange={handleChange}
                            placeholder="Enter Skills (eg: html css)"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="location">
                            Location:
                        </label>
                        <input
                            className={styles.input}
                            type="text"
                            name="location"
                            required={true}
                            value={formData?.location}
                            onChange={handleChange}
                            placeholder="Enter job Location"
                        />
                    </div>

                    <div style={{ display: "flex", justifyContent:"space-between" }}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="locationPreference">
                                Location Preference:
                            </label>
                            <select
                                onChange={handleChange}
                                className={styles.inputSelect}
                                name="locationPreference"
                                required={true}
                            >
                                <option value={formData?.locationPreference}>Select</option>
                                <option>
                                    Office
                                </option>
                                <option>
                                    Work From Home
                                </option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="jobType">
                            Job Type:
                            </label>
                            <select
                                onChange={handleChange}
                                className={styles.inputSelect}
                                name="jobType"
                                required={true}
                            >
                                <option value={formData?.jobType}>Select</option>
                                <option>
                                    Full Time
                                </option>
                                <option>
                                    Part Time
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="salary">
                            Salary:
                        </label>
                        <input
                            className={styles.input}
                            type="text"
                            name="salary"
                            required={true}
                            value={formData?.salary}
                            onChange={handleChange}
                            placeholder="Enter Salary"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="description">
                            Description:
                        </label>
                        <textarea
                            className={styles.input}
                            type="text"
                            name="description"
                            required={true}
                            value={formData?.description}
                            onChange={handleChange}
                            placeholder="Enter job Description"
                        />
                    </div>
                </div>
                <button
                    onClick={() => navigate("/")}
                    className={styles.cancel}
                >
                    Cancel
                </button>
                {isEditExistingJobPost ? (
                    <button onClick={() => handleSubmit()} className={styles.add}>
                        Edit Job
                    </button>
                ) : (
                    <button onClick={() => handleSubmit()} className={styles.add}>
                        + Add Job
                    </button>
                )}
            </div>
        </form>
    );
}


