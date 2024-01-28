import {useState} from 'react'
import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom';
import {loginUser} from "../../apis/auth"

export default function LoginComponent() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        email : "",
        password: ""
    });

    const handleChange = (e) =>{
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();

        if(!data.email || !data.password){
            return alert("Please fill in all fields !");
        }

        const response = await loginUser({...data})
        if(response){
            localStorage.setItem("token", response.token);
            localStorage.setItem("username", response.name);
            navigate("/");
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>Already have an account?</h1>
            <p className={styles.p}>Your personal job finder is here</p>

            <input
                className={styles.input}
                name='email'
                value={data.email}
                placeholder='Email'
                type='email'
            onChange={handleChange}
            />

            <input
                className={styles.input}
                name='password'
                value={data.password}
                placeholder='Password'
                type='password'
                onChange={handleChange}
            />

            <button onClick={handleSubmit} className={styles.button}>
                Sign in
            </button>
            <p className={styles.footer}>
                Don&apos;t have an account?
                <span
                    onClick={() => navigate("/register")}
                    className={styles.underline}
                >
                    Sign Up
                </span>
            </p>

        </div>
    )
}
