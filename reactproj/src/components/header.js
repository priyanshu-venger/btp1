import React, { Component, useEffect } from 'react'
import './header.css'
import logo from './assets/img/logo.png'
import axios from 'axios';
//import { Link } from 'react-router-dom';

class Header extends Component {

  handleLogout = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/logout/')
      .then(response => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('email');
        localStorage.removeItem('admin');
        // Redirect the user to the login page
        window.location.href = '/login';
      })
      .catch(error => {
        console.log(error);
      });
  }
  state = {clicked: false};
  handleclick = () =>{
    this.setState({clicked:!this.state.clicked})
  }
  
  render(){
  return (
    <>
    <nav>
    <a href="home">
      <img src={logo} alt="Indian airlines logo"  width={100} height={90} />
      </a>
      <div>
        <ul id="navbar" className={this.state.clicked ? "#navbar active":"#navbar"}>
        <li>
            <a href="/home" className='active'>
              Home
            </a>
          </li>
          <li>
          <a href={(localStorage.getItem("id")!==null &&localStorage.getItem("role")==="student")?'/list':(localStorage.getItem("id")!==null && localStorage.getItem("role")==="teacher")?"/approve":null}>
              {(localStorage.getItem("id")!==null &&localStorage.getItem("role")==="student")?"btp list":(localStorage.getItem("id")!==null && localStorage.getItem("role")==="teacher")?"btp requests":null}
            </a>
          </li>
          <li>
          <a href={(localStorage.getItem("id")!==null &&localStorage.getItem("role")==="student")?'/profile':(localStorage.getItem("id")!==null && localStorage.getItem("role")==="teacher")?"/profile":null}>
              {(localStorage.getItem("id")!==null &&localStorage.getItem("role")==="student")?"Profile":(localStorage.getItem("id")!==null && localStorage.getItem("role")==="teacher")?"Profile":null}
            </a>
          </li>
          <li>
          <a href={(localStorage.getItem("id")!==null &&localStorage.getItem("role")==="student")?'/profile':(localStorage.getItem("id")!==null && localStorage.getItem("role")==="teacher")?"/profile":null}>
              {(localStorage.getItem("id")!==null &&localStorage.getItem("role")==="student")?"Profile":(localStorage.getItem("id")!==null && localStorage.getItem("role")==="teacher")?"Profile":null}
            </a>
          </li>
          <li>
            <a href={localStorage.getItem("email")!==null || localStorage.getItem("admin")!==null?'/logout':'/login'} onClick={localStorage.getItem("email")!==null || localStorage.getItem("admin")!==null?this.handleLogout:null}>
            {localStorage.getItem("email")!==null || localStorage.getItem("admin")!==null?'Logout':'Login'}
            </a>
          </li>
        </ul>
      </div>
      <div id="mobile" onClick={this.handleclick}>
        <i id="bar" className={this.state.clicked ? "fas fa-times":"fas fa-bars"}>
        </i>

      </div>
      
    </nav>
    </>
  )
}
}
export default Header

