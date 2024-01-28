import axios from "axios";
const backendUrl = `http://localhost:8000/api/v1/job`;

export const getAllJobs = ({ skills, title }) => {
    try {
        const reqUrl = `${backendUrl}/all?skills=${skills}&title=${title}`;
        const response = axios.get(reqUrl);
        console.log("i am from try block")
        console.log(response.data.data);
    } catch (error) {
        console.log('error coming from catch block')
        console.log(error.message);
        // toast with custom message for clients
    }
};

export const getJobDetails = async (jobId) => {
    try {
        const reqUrl = `${backendUrl}/job-description/${jobId}`;
        const response = await axios.get(reqUrl);
        return response.data?.data;
    } catch (error) {
        return error ;
    }
};

export const createJobPost = async ({
    companyName,
    title, 
    location,
    skills, 
    salary, 
    description
}) => {
    try {
        const reqUrl = `${backendUrl}/create`;
        const reqPayload = {
            companyName,
            title, 
            location, 
            skills, 
            salary, 
            description
        };
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        console.log(token)
        const response = await axios.post(reqUrl, reqPayload);
        console.log("this is from auth response")
        console.log(response)
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const updateJobPost = async (
    jobId,
    { companyName, logoUrl, title, description }
) => {
    try {
        const reqUrl = `${backendUrl}/edit/${jobId}`;
        const reqPayload = {
            companyName,
            logoUrl,
            title,
            description,
        };
        debugger;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.put(reqUrl, reqPayload);
        return response;
    } catch (error) {
        console.log(error);
    }
};