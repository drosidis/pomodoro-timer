import React from 'react';
import { NavLink } from 'react-router-dom'
import './Header.css';

const header = (props) => {
  return (
    <div className="header">
      <ul className="container">
        <li><NavLink to="/" exact>Start/Stop</NavLink></li>
        <li><NavLink to="/past">View past</NavLink></li>
        <li><NavLink to="/reports">Reports</NavLink></li>
        <li><NavLink to="/settings">Settings</NavLink></li>
        <li><NavLink to="/">Sign out</NavLink></li>
      </ul>
    </div>
  );
};

export default header;
