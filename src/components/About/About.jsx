import React from 'react';

import './About.css'
import Insta from './Insta.png'
import Mail from './Mail.png'
import Linkdin from './Linkdin.png'

function About() {
  return (
    <footer id="about" className="about-main">
      <h2> Contact on </h2>

      <div className="about-links">
        <a href=""> <img src={Insta} alt=""/> </a>
        <a href=""> <img src={Mail} alt=""/> </a>
        <a href=""> <img src={Linkdin} alt=""/> </a>
      </div>

      <p> Website designed and handled by Suresh </p>

    </footer>
  );
}

export default About;
