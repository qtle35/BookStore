import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListLaptopComponent from './components/ListLaptopComponent';
import CreateLaptopComponent from './components/CreateLaptopComponent';
import DetectLanguage from './components/DetectLanguage';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path='/' element={<ListLaptopComponent />} />
          <Route path='/laptop' element={<ListLaptopComponent />} />
          <Route path='/laptop/:id' element={<CreateLaptopComponent />} />
          <Route path='/language' element={<DetectLanguage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
