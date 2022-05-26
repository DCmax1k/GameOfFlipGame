import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import PaymentPage from './components/PaymentPage';
import GamePage from './components/GamePage';
import PaymentSuccess from './components/PaymentSuccess';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
