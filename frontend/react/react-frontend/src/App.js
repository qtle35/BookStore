import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListLaptopComponent from './components/ListLaptopComponent';
import CreateLaptopComponent from './components/CreateLaptopComponent';
import { PostList } from './PostList';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path='/' element={<ListLaptopComponent />} />
          <Route path='/laptop' element={<ListLaptopComponent />} />
          <Route path='/laptop/:id' element={<CreateLaptopComponent />} />
        </Routes>
      </div>
    </BrowserRouter>
    // <PostList />
  );
}

export default App;
