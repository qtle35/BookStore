import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateBook from './components/CreateBook';
import ListBook from './components/ListBook';
import Login from './components/acc/Login';
import Signup from './components/acc/Signup';
import Navbar from './components/Navbar';
import UserBookDetail from './components/UserBookDetail';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<ListBook />} />
        <Route path='/book' element={<ListBook />} />
        <Route path='/book/:id' element={<CreateBook />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/userbookdetail/:id' element={<UserBookDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
