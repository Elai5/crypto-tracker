/** @format */

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { Profile } from "./pages/Profile";
import Header from "./components/Header";

const App = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [coins, setCoins] = React.useState([]);
  const [selectedCoin, setSelectedCoin] = React.useState(null);

  const onSearchChange = (term) => setSearchTerm(term);
  const onCoinSelect = (coin) => setSelectedCoin(coin);
  return (
    <BrowserRouter>
      <Header
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        coins={coins}
        onCoinSelect={onCoinSelect}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
