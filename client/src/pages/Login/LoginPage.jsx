import React from 'react'
import loginImgae from "../../assets/login.png"
import LoginComponent from '../../components/Login/LoginComponent'

export default function LoginPage() {
  return (
    <div style={{display: 'flex'}}>
      <LoginComponent />

      <img
       style= {{maxHeight:"100vh", width:"50vw"}}
       src= {loginImgae}
       alt= 'Login Image'
       />
    </div>
  )
}
