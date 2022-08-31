import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import convertLogic from './utils/convertLogic';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [phrase, setPhrase] = useState('');
  const [num, setNum] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [hint, setHint] = useState('Type at least one number');

  const validate = (e) => {
    setInputValue(e.target.value);
    if (e.target.value < 1) return setDisabled(true);
    if (e.target.value % 1 !== 0) return setDisabled(true);
    if (e.target.value[0] === '0') return setDisabled(true);

    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (e.target.value.match(format)) return setDisabled(true);

    return setDisabled(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = convertLogic(inputValue);
    setNum(inputValue);
    setPhrase(result);
  };

  return (
    <div>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Number to convert</Form.Label>
            <Form.Control type='number' onChange={(e) => validate(e)} value={inputValue}></Form.Control>
            <Form.Text className='text-muted'>{hint}</Form.Text>
          </Form.Group>
          <Button disabled={disabled} type='submit'>
            Convert
          </Button>
        </Form>
        <p>Your number as you typed it:</p>
        <h1>{phrase && num}</h1>
        <p>Your number as you'd say it:</p>
        <h1>{phrase}</h1>
      </Container>
    </div>
  );
}

export default App;
