// Header.js
import React from 'react';
import { Download } from 'react-feather'; // Import the download icon
import '../styles/main.css';

const Header = () => {
  return (
    <header className="header">
      <div className="hero">
        <div className="name-container">
          <h1 className="name">Lokesh L K S</h1>
        </div>
    
        <div className="intro-container">
        <p>Passionate about Quantum Computing, Blockchain, and Cybersecurity! However I am a Data Scientist at Heart.</p>
        <a href="https://drive.google.com/file/d/12khX_7tO6CP5Dbno9C5HZBtramxGiQ6J/view?usp=sharing" download className="resume-link">
          Download Resume <Download />
        </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
