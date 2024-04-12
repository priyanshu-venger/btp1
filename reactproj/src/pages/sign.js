import React, { useState } from 'react';
import axios from 'axios';
import { NavLink,useNavigate } from "react-router-dom";
import'./sign.css';

function SignupForm() {
  const [name, setName] = useState('');
  const [Dept,setdept]=useState('');
  const [ID,setID]=useState('');
  const [email,setEmail] =useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate=useNavigate();
const handleSubmit = async (event) => {
  event.preventDefault();
  if (password !== password2) {
    setErrorMessage('Passwords do not match');
    return;
  }
  try {
    const response = await axios.post('http://127.0.0.1:5000/signup/', { id:JSON.stringify(ID),full_name:JSON.stringify(name), email:JSON.stringify(email) , password:JSON.stringify(password),department:JSON.stringify(Dept) });
    console.log(response);
    navigate('/login');
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
    setErrorMessage('Email already taken');
  }  
};
  

  return (
    <>
    <div className="background4">
    </div>
    <form onSubmit={handleSubmit}>
      <h3>Signup</h3>
      <label htmlFor="ID">ID</label>
      <input type="text" placeholder="ID" name="ID" id="ID" value={ID} onChange={(event) => setID(event.target.value)} />
      <label htmlFor="name">Name</label>
      <input type="text" placeholder="Full name" name="name" id="name" value={name} onChange={(event) => setName(event.target.value)}/>

      <label htmlFor="email">Email</label>
      <input type="email" placeholder="Email" name="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      <label htmlFor="Department">Department</label>
      <input type="Department" placeholder="Department" name="Department" id="Department" value={Dept} onChange={(event) => setdept(event.target.value)} />
      <label htmlFor="password">Password</label>
      <input type="password" placeholder="Password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)}/>

      <label htmlFor="password2">Confirm Password</label>
      <input type="password" placeholder="Confirm Password" id="password2" name="password2" value={password2} onChange={(event) => setPassword2(event.target.value)} />
      {errorMessage && <div>{errorMessage}</div>}
      <button type="submit">Signup</button>
      <NavLink to="/login"><div className='ne'>Already have account</div></NavLink>
    </form>
    </>
  );
}

export default SignupForm;
