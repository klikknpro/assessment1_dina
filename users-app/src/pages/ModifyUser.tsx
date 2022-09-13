import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Container, Form } from 'react-bootstrap';
import { getUser, editUserNames } from '../api/diNaUsers';
import { FormData } from '../utils/interfaces';

function ModifyUser() {
  const [placeholderFirstName, setPlaceholderFirstName] = useState<string | undefined>('');
  const [placeholderLastName, setPlaceholderLastName] = useState<string | undefined>('');
  const [done, setDone] = useState<boolean>(false);

  const { id } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });

  const modify = async (data: FormData) => {
    if (!id) return alert('Missing id');
    const modifiedUser = await editUserNames(data.firstName, data.lastName, id);
    setPlaceholderFirstName(modifiedUser?.first_name);
    setPlaceholderLastName(modifiedUser?.last_name);
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
      <Form onSubmit={handleSubmit((data) => modify(data))}>
        <h2 className='text-white mb-4'>Modify the user profile</h2>
        <Form.Group className='mb-3'>
          <Form.Label className='text-white'>
            Current first name: <span className='text-wrap bg-success badge fs-6'>{placeholderFirstName}</span>
          </Form.Label>
          <Form.Control
            {...register('firstName')}
            placeholder='First name'
            aria-label='edit-first-name-input'
            type='text'
          ></Form.Control>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='text-white'>
            Current last name: <span className='text-wrap bg-success badge fs-6'>{placeholderLastName}</span>
          </Form.Label>
          <Form.Control
            {...register('lastName')}
            placeholder='Last name'
            aria-label='edit-last-name-input'
            type='text'
          ></Form.Control>
        </Form.Group>
        <Button className='m-4' type='submit' variant='outline-warning'>
          Modify
        </Button>
        {done && <p className='text-white'>Congrats! Your user data has been updated.</p>}
      </Form>
    </Container>
  );
}

export default ModifyUser;
