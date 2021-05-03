import './About.css'
import React from "react";

const About = () => {
  return (
    <article className="about">
        <p className="about-info">Code for Denver is a group of volunteer technologists who build software to help nonprofits and local government better serve their community.</p>

        <p className="about-info">This dashboard was built in response to the <a href="https://covid19.colorado.gov/data">Colorado Department of Public Health and Environment's COVID-19 dashboard</a> that we at Code for Denver noticed did not have a high level of accessibility. We've created this smaller version as a concept highlighting accessibility for screenreaders and keyboard navigation of the website, hoping to provide the same critical information about COVID-19, using the State of Colorado's own data source, to a wider audience of residents.</p>

        <p className="about-info">If you'd like to contribute or learn more, you can find the <a href="https://github.com/codefordenver/cdphe-accessible-covid19">project on GitHub</a>.</p>
    </article>
  );
}

export default About;