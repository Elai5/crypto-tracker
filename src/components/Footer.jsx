// components/Footer.jsx
import React from 'react';

const Footer = ({ darkMode }) => (
  <footer className={`mt-12 p-6 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
    <p>&copy; 2025 Crypto Dashboard. Data provided by CoinGecko API.</p>
    <p className="text-sm mt-2">
      Built with React, Tailwind CSS, and Recharts
    </p>
  </footer>
);

export default Footer;