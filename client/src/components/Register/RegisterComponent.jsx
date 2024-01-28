import { React, useState } from 'react'
import styles from "./Register.module.css";
import { useNavigate } from 'react-router-dom';
import {registerUser} from "../../apis/auth" ;
import {toast} from "react-toastify";

export default function RegisterComponent() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  })

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!data.name || !data.email || !data.mobile || !data.password){
      return alert("Please fill in all fields !");
    }

    const response = await registerUser({...data});
    console.log(response);
    if(response){
      localStorage.setItem("token", response.token);
      localStorage.setItem("userName", response.name);
      navigate("/");
    }
  }

  const redirectToLoginPage = ()=> {
      navigate("/login")
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Create an account</h1>
      <p className={styles.p}>Your personal job finder is here</p>
      <input
        className={styles.input}
        name='name'
        type={'text'}
        value={data.name}
        placeholder='Name'
        onChange={handleChange}
      />

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
        name='mobile'
        value={data.mobile}
        placeholder='Mobile'
        type='tel'
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
        Create Account
      </button>

      <p>
        Already have an account?
        <span
          className={styles.underline}
          onClick={redirectToLoginPage}
        >
          Sign in
        </span>
      </p>

    </div>
  )
}
