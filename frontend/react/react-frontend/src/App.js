import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateBook from './components/CreateBook';
import ListBook from './components/ListBook';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';

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
        </Routes>
    </BrowserRouter>
  );
}

export default App;
