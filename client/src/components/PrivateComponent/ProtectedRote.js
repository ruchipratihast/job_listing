import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function ProtectedRote(props) {
  const { component } = props;
  const [isActive, setIsActive] = useState();
  const Navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("token");
    setIsActive(JSON.parse(token));
  },[]);

  return <div>{isActive ? <component /> : <Navigate to="/register" />}</div>
}

