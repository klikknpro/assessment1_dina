import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import convertLogic from './utils/convertLogic';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [phrase, setPhrase] = useState('');
  const [num, setNum] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [language, setLanguage] = useState('default');

  const handleLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const validate = (e) => {
    setInputValue(e.target.value);
    if (e.target.value < 1) return setDisabled(true);
    if (e.target.value > 999999999999) return setDisabled(true);
    if (e.target.value % 1 !== 0) return setDisabled(true);
    if (e.target.value[0] === '0') return setDisabled(true);

    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (e.target.value.match(format)) return setDisabled(true);

    return setDisabled(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = convertLogic(inputValue, language);
    setPhrase(result);
    setNum(inputValue);
  };

  return (
    <div>
      <Container className='w-75'>
        <Form onSubmit={handleSubmit}>
          <Form.Select onChange={(e) => handleLanguage(e)} size='sm' className='w-25'>
            <option value='default'>American (default)</option>
            <option value='british'>British</option>
          </Form.Select>
          <p className='text-muted w-25'>{language === 'british' && 'For numbers between 1100 and 1999'}</p>
          <Form.Group>
            <Form.Label className='fs-5'>Arabic number conversion tool</Form.Label>
            <p>Enter a number to convert into it's English phrase</p>
            <Form.Control aria-label='input' type='number' onChange={(e) => validate(e)} value={inputValue}></Form.Control>
            <Form.Text className='text-muted'>{disabled && 'Number must be an integer between 1 and 999999999999'}</Form.Text>
          </Form.Group>
          <Button className='m-4' disabled={disabled} type='submit' variant='success'>
            Convert
          </Button>
        </Form>
        {phrase && (
          <div>
            <p>Your number as you typed it:</p>
            <h1>{num}</h1>
            <p>Your number as you'd say it:</p>
            <h1>{phrase}</h1>
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;
