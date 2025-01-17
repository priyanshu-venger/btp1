import React,{useState} from "react"
import axios from "axios";
import { NavLink,useLocation,useNavigate } from "react-router-dom";
import './login.css';
import { useEffect } from "react";

const LoginForm = (props) => {
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [type,settype]=useState('n');
  const navigate=useNavigate();
  const location=useLocation();
  useEffect(()=>{
    if (localStorage.getItem("ID")!==null&&(localStorage.getItem("type")==='student'|| localStorage.getItem('type')==='teacher')) navigate('/home');
  })
  console.log(localStorage.getItem("ID"))
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      axios.defaults.headers.post['Content-Type'] = 'application/json';
      const response = await axios.post('http://127.0.0.1:5000/login/', { ID:ID, password:password});
      settype(response.data.type);
      if (response.data.type!==''){
      localStorage.setItem('access_token', JSON.stringify(response.data.access));
      localStorage.setItem('refresh_token', JSON.stringify(response.data.refresh));
      // Redirect to dashboard or other page
      props.onSignin(ID,response.data.type);
      }
      if(response.data.type==="user")navigate('/home');
      if(response.data.type==="admin")
        navigate('/home');
    } catch (error) {
      console.log(ID,password)
      console.log(error.response.data)
      setErrorMessage(error.response.data.detail);
    }
  };
  
  return (
    <div className="background1">
      <form onSubmit={handleSubmit} method="post">
        
        <h3>Login </h3>
        <label htmlFor="error" hidden={location.state?false:true} style={{color:"red"}} className="center">Sign in first!</label>

        <label htmlFor="error" hidden={type===""?false:true} style={{color:"red"}} className="center">These credentials don't exist!</label>
        <br />
        <label htmlFor="ID">ID</label>
        <input type="text" placeholder="Enter ID" id="ID" name="ID" value={ID} onChange={(event) => setID(event.target.value)}/>
    
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
        {errorMessage && <div>{errorMessage}</div>}
        <button type="submit">Log In</button>
        <NavLink to="/"><div className="ne">New User</div></NavLink>
  
      </form>
    </div>
  )
}


export default LoginForm
