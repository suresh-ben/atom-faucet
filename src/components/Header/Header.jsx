import React, { useState } from 'react';

import './Header.css';
import Logo from './Logo.png'

function Header(props){

  const [ connectionMessageStyle, SetConnectionMessageStyle ] = useState({});

  function connectWallet(){
    SetConnectionMessageStyle({color : "white"});

    let status = props.connect();
    if(status === "false")
      SetConnectionMessageStyle({color : "red"});
    else
      SetConnectionMessageStyle({color : "green"});
  }

  return(
    <div className="header-main">

      <a className="head-link" href="/">
        <img src={Logo} alt="Logo"/>
        <h2> Atom </h2>
      </a>

      <button style={connectionMessageStyle}  onClick={connectWallet}>
        {props.connectionStatus}
      </button> 
    </div>
  );
}

export default Header;