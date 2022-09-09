import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewUser from './pages/NewUser';
import EditUser from './pages/EditUser';
import NavMenu from './components/NavMenu';

function App() {
  return (
    <div>
      <NavMenu />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<NewUser />} />
          <Route path='/edit' element={<EditUser />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
