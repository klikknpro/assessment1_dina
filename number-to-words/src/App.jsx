import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import convertLogic from './utils/convertLogic';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [phrase, setPhrase] = useState('');

  const convert = (e) => {
    e.preventDefault();
    const result = convertLogic(inputValue);
    setPhrase(result);
    setInputValue('');
  };

  return (
    <div>
      <Container>
        <Form onSubmit={convert}>
          <Form.Group>
            <Form.Label>Number to convert</Form.Label>
            <Form.Control type='number' onChange={(e) => setInputValue(e.target.value)} value={inputValue}></Form.Control>
            <Form.Text className='text-muted'>Hint can come here</Form.Text>
          </Form.Group>
          <Button type='submit'>Convert</Button>
        </Form>
        <p>Your number as you'd say it:</p>
        <h1>{phrase}</h1>
      </Container>
    </div>
  );
}

export default App;
