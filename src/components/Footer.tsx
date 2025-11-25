import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>Data From:</p>
      <div className="links">
        <a href="https://www.noaa.gov/" target="_blank" rel="noopener noreferrer">NOAA</a>
        <a href="https://www.mbari.org/" target="_blank" rel="noopener noreferrer">MBARI</a>
        <a href="https://www.marinespecies.org/" target="_blank" rel="noopener noreferrer">WoRMS</a>
      </div>
    </footer>
  );
};

export default Footer;
