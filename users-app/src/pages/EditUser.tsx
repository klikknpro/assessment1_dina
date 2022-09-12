import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import { getUser, editUserNames } from '../api/diNaUsers';

function EditUser() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [placeholderFirstName, setPlaceholderFirstName] = useState<string | undefined>('');
  const [placeholderLastName, setPlaceholderLastName] = useState<string | undefined>('');
  const [done, setDone] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  const { id } = useParams();

  const validate = (input: string): boolean => {
    const format = /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]/;
    if (input.match(format)) return false;
    return true;
  };

  const changeFirstName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFirstName(event.target.value);
    if (!validate(event.target.value)) return setDisabled(true);
    return setDisabled(false);
  };

  const changeLastName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLastName(event.target.value);
    if (!validate(event.target.value)) return setDisabled(true);
    return setDisabled(false);
  };

  const handleModify = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!id) return alert('Missing id');
    const modifiedUser = await editUserNames(firstName, lastName, id);
    setPlaceholderFirstName(modifiedUser?.first_name);
    setPlaceholderLastName(modifiedUser?.last_name);
    setFirstName('');
    setLastName('');
    setDisabled(true);
    setDone(true);
  };

  useEffect(() => {
    let ignore = false;

    async function fetchUser() {
      const response = await getUser(id);
      if (response && !ignore) {
        setPlaceholderFirstName(response.data.first_name);
        setPlaceholderLastName(response.data.last_name);
      }
    }
    fetchUser();

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Container className='w-50'>
      <Form onSubmit={handleModify}>
        <Form.Group className='mb-2'>
          <Form.Label className='text-white'>First name</Form.Label>
          <Form.Control
            aria-label='edit-first-name-input'
            type='text'
            onChange={changeFirstName}
            value={firstName}
            placeholder={placeholderFirstName}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label className='text-white'>Last name</Form.Label>
          <Form.Control
            aria-label='edit-last-name-input'
            type='text'
            onChange={changeLastName}
            value={lastName}
            placeholder={placeholderLastName}
            required
          ></Form.Control>
        </Form.Group>
        <Button className='m-4' disabled={disabled} type='submit' variant='success'>
          Modify
        </Button>
        {done && <p className='text-white'>Congrats! Your user data has been updated.</p>}
      </Form>
    </Container>
  );
}

export default EditUser;
