import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Routes, BrowserRouter } from 'react-router-dom';
import { NavbarComponent } from './components';
import Home from './pages/Home';
import Sukses from './pages/Sukses';


function App(){
    return (
      <BrowserRouter>
        <NavbarComponent />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sukses' element={<Sukses />}  />
          </Routes>
      </BrowserRouter>
    );
  }


export default App;