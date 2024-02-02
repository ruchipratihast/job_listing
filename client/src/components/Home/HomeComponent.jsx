import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DEFAULT_SKILLS } from "../../utils/constant";
import { getAllJobs } from "../../apis/job";
import { IoMdPeople } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";

export default function HomeComponent() {
    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [skills, setSkills] = useState([]);
    const [search, setSearch] = useState("");

    const handleSkill = (event) => {
        if (!event.target.value) return;

        const newArr = skills.filter((skill) => skill === event.target.value);
        if (!newArr.length) {
            setSkills([...skills, event.target.value]);
            fetchAllJobs([...skills, event.target.value], "");
        }else{

            fetchAllJobs([], "");
        }
    };

    const removeSkill = (selectedSkill) => {
        const newArr = skills.filter((skill) => skill !== selectedSkill);
        setSkills([...newArr]);
        fetchAllJobs([...newArr], "");
    };

    
    const fetchAllJobs = async (skills, title ) => {
        console.log("Fetch all Jobs");
        console.log(skills);
        const reqPayload = {
            skills: skills.join(","),
            title: title?.trim(),
        };
        const jobList = await getAllJobs(reqPayload);
        setJobs(() => jobList);
    };
    
    useEffect(() => {
        fetchAllJobs([], "");
    }, []);


    const handleKeyDown = (event) => {
        if (!search?.trim()) {
            fetchAllJobs([],"");
            return;
        }
        if (event.keyCode === 13) {
            fetchAllJobs([], search);
        }

        if(search === ""){
            fetchAllJobs([], search);
        }
    };

    return (
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
                <div className={styles.containerTop}>
                    <input
                        className={styles.inputTop}
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        onKeyDown={handleKeyDown}
                        type="text"
                        name="search"
                        placeholder="Type any job title"
                    />  
                </div>
                <div className={styles.containerBottom}>
                    <select
                        onChange={handleSkill}
                        className={styles.inputSelect}
                        name="remote"
                    >
                        <option value="">Skills</option>
                        {DEFAULT_SKILLS.map((skill) => (
                            <option key={skill} value={skill}>
                                {skill}
                            </option>
                        ))}
                    </select>
                    {skills.map((skill) => {
                        return (
                            <span className={styles.chip} key={skill}>
                                {skill}
                                <span
                                    onClick={() => removeSkill(skill)}
                                    className={styles.cross}
                                >
                                    X
                                </span>
                            </span>
                        );
                    })}
                    <button
                        onClick={() => navigate("/job-post")}
                        className={styles.edit}
                    >
                        Add Job
                    </button>
                </div>
            </div>
            {/* <div className={styles.bottom}> */}
            {jobs.map((data) => {
                return (
                    <div key={data._id} className={styles.list}>
                        <div className={styles.listLeft}>
                            <div>
                                <img src={data.logoUrl}  height={'100px'} width={'100px'} alt="logo Image"/>
                            </div>
                            <div className={styles.infoLeft}>
                                <p className={styles.position}>
                                    {data.title}
                                </p>
                                <p className={styles.extraInfo}>
                                    <span className={styles.greyText}>
                                       <IoMdPeople/> 11-50
                                    </span>
                                    <span className={styles.greyText}>
                                    ₹  {data.salary}
                                    </span>
                                    <span className={styles.greyText}>
                                       <MdLocationOn/> {data.location}
                                    </span>
                                </p>
                                <p className={styles.extraInfo}>
                                    <span className={styles.redText}>
                                        {data.locationPreference}
                                    </span>
                                    <span className={styles.redText}>
                                        {data.jobType}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div>
                            <div>
                                {data.skills.map((skill) => {
                                    return (
                                        <span
                                            className={styles.skill}
                                            key={skill}
                                        >
                                            {skill}
                                        </span>
                                    );
                                })}
                            </div>
                            <div className={styles.btnGroup}>
                                <button
                                    onClick={() =>
                                        navigate("/job-post", {
                                            state: {
                                                id: data._id,
                                                data: data,
                                                edit: true,
                                            },
                                        })
                                    }
                                    className={styles.edit}
                                >
                                    Edit job
                                </button>
                                <button
                                    onClick={() =>
                                        navigate(`/job-details/${data._id}`)
                                    }
                                    className={styles.view}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                 );
            })} 
        </>
    );
}
