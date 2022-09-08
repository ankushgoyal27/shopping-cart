import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './cart/cart';
import User from './user/user';

function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="home" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
