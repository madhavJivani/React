import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Coins from './components/Coins';
import CoinDetails from "./components/CoinDetails"
import Exchanges from './components/Exchanges';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <Router>
      <Header />
      <Toaster position="bottom-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="coins/coin/:id" element={<CoinDetails />} />
        <Route path="/exchanges" element={<Exchanges />} />
      </Routes>
    </Router>
  );
};

export default App;
