import React from "react";
import './Sidebar.css'
import { Link } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu'

const SidebarMobile = () => {
  return (
    <Menu className="sidebar-mobile" role="menu" aria-label="Denver Covid-19 Visualization Options">
        <h1 className="title">Colorado Covid-19 Dashboard</h1>
        <Link to="/" role="none">
          <h4 className="option" role="menuitem" tabIndex="0">Daily Snapshot</h4>
        </Link>
        <h4 className="option">Case Summary</h4>
        <ul className="sub-list" value="Case Summary" role="menuitem">
          <Link to="/daily-cases">
            <li className="sub-option" role="menuitem" aria-label="Daily Cases" tabIndex="0">Cases</li>
          </Link>
          <Link to="/daily-tested">
            <li className="sub-option" role="menuitem" aria-label="Daily Tested" tabIndex="0">Tested</li>
          </Link>
          <Link to="/daily-hosp">
            <li className="sub-option" role="menuitem" aria-label="Daily Hospitalized" tabIndex="0">Hospitalized</li>
          </Link>
          <Link to="/daily-deaths">
            <li className="sub-option" role="menuitem" aria-label="Daily Deaths" tabIndex="0">Deaths</li>
          </Link>
        </ul>
        <h4 className="option">Vaccine Summary</h4>
        <ul className="sub-list" value="Vaccine Summary" role="menuitem">
          <Link to="/vaccine-all">
            <li className="sub-option" role="menuitem" aria-label="Vaccine Summary All" tabIndex="0">All Vaccines</li>
          </Link>
          <Link to="/vaccine-jnj">
            <li className="sub-option" role="menuitem" aria-label="Vaccine Summary Johnson & Johnson" tabIndex="0">Johnson & Johnson Vaccines</li>
          </Link>
          <Link to="/vaccine-pfizer">
            <li className="sub-option" role="menuitem" aria-label="Vaccine Summary Pfizer" tabIndex="0">Pfizer Vaccines</li>
          </Link>
          <Link to="/vaccine-moderna">
            <li className="sub-option" role="menuitem" aria-label="Vaccine Summary Moderna" tabIndex="0">Moderna Vaccines</li>
          </Link>
          <Link to="/vaccine-unspecified">
            <li className="sub-option" role="menuitem" aria-label="Vaccine Summary Unspecified" tabIndex="0">Unspecified Vaccines</li>
          </Link>
        </ul>
        <Link to="/about" className="link">
          <h4 className="option" role="menuitem" tabIndex="0">About</h4>
        </Link>
    </Menu>
  );
};

export default SidebarMobile;