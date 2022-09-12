import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { createUser } from '../api/diNaUsers';
import { User } from '../utils/interfaces';

function NewUser() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [newUser, setNewUser] = useState<User | undefined>(undefined);

  const validate = (input: string): boolean => {
    const format = /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]/;
    if (input.match(format)) return false;
    if (input.length < 3) return false;
    return true;
  };

  const changeLastName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (newUser) setNewUser(undefined);
    setLastName(event.target.value);
    if (!validate(event.target.value)) return setDisabled(true);
    return setDisabled(false);
  };

  const changeFirstName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (newUser) setNewUser(undefined);
    setFirstName(event.target.value);
    if (!validate(event.target.value)) return setDisabled(true);
    return setDisabled(false);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const freshUser = await createUser(firstName, lastName);
    setNewUser(freshUser);
    setFirstName('');
    setLastName('');
  };

  return (
    <Container className='w-50'>
      <Form onSubmit={handleSubmit}>
        <h2 className='text-white'>Create a new user</h2>
        <Form.Group className='mb-2'>
          <Form.Label className='text-white'>First name</Form.Label>
          <Form.Control
            aria-label='first-name-input'
            type='text'
            onChange={changeFirstName}
            value={firstName}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label className='text-white'>Last name</Form.Label>
          <Form.Control
            aria-label='last-name-input'
            type='text'
            onChange={changeLastName}
            value={lastName}
            required
          ></Form.Control>
        </Form.Group>
        <Button className='m-4' disabled={disabled} type='submit' variant='success'>
          Create
        </Button>
        {newUser && (
          <p className='text-white'>
            Congrats! {newUser.first_name} {newUser.last_name} has been created
          </p>
        )}
      </Form>
    </Container>
  );
}

export default NewUser;
