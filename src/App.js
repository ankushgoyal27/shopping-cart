import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './cart/cart';
import RegisterUser from './user/register-user/register-user';
import SignIn from './user/sign-in/sign-in';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RegisterUser />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
