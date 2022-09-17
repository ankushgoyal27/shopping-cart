import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './cart/cart';
import SignIn from './user/sign-in/sign-in';
import User from './user/user';

function App() {
  return (
    <div className="App">
      <h1>Welcome to Shopping Cart! </h1>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
