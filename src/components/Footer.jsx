
import React from 'react';

const Footer = ({ darkMode }) => (
  <footer className={`mt-12 p-6 text-center font-primary ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
    <p className="text-sm mt-2">
      Realtime Cryptocurrency Tracker
    </p>
    <p>&copy; All Rights Reserved. Data provided by CoinGecko API.</p>
    
  </footer>
);

export default Footer;