import Axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';

function Header(props) {
  Axios.defaults.withCredentials = true;
  Axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest',
  };
  Axios.defaults.credentials = 'include';
  const navigate = useNavigate();
  function logout(event){
    Axios.get("http://localhost:4000/logout").then(()=>{})
    event.preventDefault();
    navigate("/");
  }
  return (
    <header>
      <img alt="bulb" src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"></img>
      <span>Keeper</span>
      <div className="profile">
        <p>{props.user}</p>
        <a href="/" onClick={logout}><p>Logout</p></a>
      </div>
      <PersonOutlineRoundedIcon className="user" color="action" fontSize="large" />
    </header>
  );
}

export default Header;
