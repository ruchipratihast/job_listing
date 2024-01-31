import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getJobDetails } from "../../apis/job";
import styles from "./JobDetails.module.css";

const JobDetailsComponent = ({ }) => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);


    const fetchJobDetailsById = async () => {
        const jobId = window.location.pathname?.split("/").slice(-1)[0];
        if (!jobId) return;
        const response = await getJobDetails(jobId);
        setData(response);
    };

    useEffect(() => {
        fetchJobDetailsById();
    }, []);

    return (
        <>
            {data !== null ? (
                <>
                    <div className={styles.header}>
                        <h1>Jobfinder</h1>
                        <div>
                        <button
                            onClick={() => {
                                navigate("/Login")
                            }}
                            className={styles.loginButton}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => {
                                navigate("/register")
                            }}
                            className={styles.registerButton}
                        >
                            Register
                        </button>
                        </div>
                    </div>
                    <div className={styles.container}>
                        <p className={styles.containerText}>
                            {data?.companyName}
                        </p>
                    </div>
                    <div className={styles.containerBottom}>
                        <div className={styles.preHeading}>
                            <p className={styles.lightText}>{data?.jobType}</p>
                        </div>
                        <div className={styles.heading}>
                            <div>
                                <p className={styles.boldText}>{data?.title}</p>
                                <p className={styles.locationText}>
                                    {data?.location}
                                </p>
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        navigate("/job-post", {
                                            state: {
                                                id: data._id,
                                                data: data,
                                                edit: true,
                                            },
                                        });
                                    }}
                                    className={styles.edit}
                                >
                                    Edit Job
                                </button>
                            </div>
                        </div>
                        <div className={styles.perks}>
                            <div>
                                <p className={styles.lightText}>Stipend</p>
                                <p className={styles.lightText}>
                                    {data.salary}
                                </p>
                            </div>
                            <div>
                                <p className={styles.lightText}>Duration</p>
                                <p className={styles.lightText}>6 Months</p>
                            </div>
                        </div>
                        <div className={styles.info}>
                            <h2>About Company</h2>
                            <p>We provide technology-based services to help businesses and organizations achieve their goals. We offer a wide range of services, including software development, system integration, network and security services, cloud computing, and data analytics. Our primary focus is on leveraging technology to streamline business processes, improve productivity, and enhance overall efficiency.</p>
                        </div>
                        <div className={styles.info}>
                            <h2>Skill(s) Required</h2>
                            {data.skills.map((skill) => {
                                return (
                                    <span className={styles.skill} key={skill}>
                                        {skill}
                                    </span>
                                );
                            })}
                        </div>
                        <div className={styles.info}>
                            <h2>About the job/internship</h2>
                            <p>We are looking for a responsible PHP/WordPress/Laravel/Shopify Developer. He/She will be liable for managing services and therefore the interchange of knowledge between the server and the users. The candidate's primary focus is going to be the event of all server-side logic, definition, and maintenance of the central database and ensuring high performance and responsiveness to requests from the front end.</p>
                        </div>

                        <div className={styles.info}>
                            <h2>Additional Information</h2>
                            <p>{data.description}</p>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default JobDetailsComponent;
