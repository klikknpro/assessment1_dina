import React from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateUser from './pages/CreateUser';
import ModifyUser from './pages/ModifyUser';
import NavMenu from './components/NavMenu';

function App() {
  return (
    <div>
      <NavMenu />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<CreateUser />} />
          <Route path='/edit/:id' element={<ModifyUser />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
