import axios from "axios";

const backendUrl = `http://localhost:8000/api/v1/auth` ;

export const registerUser = async ({ name, email, mobile, password }) =>{
    try{
      
        const reqUrl = `${backendUrl}/register`;
        const reqPayload = { name, email, mobile, password };
        const reponse = await axios.post(reqUrl,reqPayload);
        console.log(Response);
    }
    catch(err){
        console.log(err);
        //toast
    }
}

export const loginUser = async ({ email, password }) =>{
    try{
      
        const reqUrl = `${backendUrl}/login`;
        const reqPayload = { email, password };
        const reponse = await axios.post(reqUrl,reqPayload);
        console.log(Response);
        return reponse.data
    }
    catch(err){
        console.log(err);
    }
}