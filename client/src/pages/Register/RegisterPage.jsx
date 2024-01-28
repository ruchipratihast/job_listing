import React from 'react'
import RegisterComponent from '../../components/Register/RegisterComponent'
import loginImage from '../../assets/login.png'

export default function RegisterPage() {
  return (
   <div style={{ display: 'flex' }}>
    
     <RegisterComponent />

     <img
      style={{maxHeight: '100vh', width:'50vw'}}
      src={loginImage} 
      alt='login image'
     />

   </div>
  )
}
