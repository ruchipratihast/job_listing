import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function ProtectedRote(props) {
  const { Component } = props;
  const [isActive, setIsActive] = useState();
  const Navigate = useNavigate("");

  useEffect(()=>{
    const token = localStorage.getItem("token");
    setIsActive(token);
  },[]);

  return <div>{isActive ? <Component /> : <Navigate to="/register" />}</div>
}

