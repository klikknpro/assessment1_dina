import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { createUser } from '../api/diNaUsers';
import { User, FormData } from '../utils/interfaces';

function CreateUser() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });

  const [newUser, setNewUser] = useState<User | undefined>(undefined);
  // watch() re-renders after every keystroke, kinda like a useState() controlled input
  // const firstName = watch('firstName');

  const submit = async (data: FormData) => {
    const freshUser = await createUser(data.firstName, data.lastName);
    setNewUser(freshUser);
  };

  return (
    <Container className='w-50'>
      <Form onSubmit={handleSubmit((data) => submit(data))}>
        <h2 className='text-white mb-4'>Create a new user</h2>
        <Form.Group className='mb-3'>
          <Form.Label className='text-white'>First name</Form.Label>
          <Form.Control
            {...register('firstName', { required: 'First name is required' })}
            aria-label='first-name-input'
            type='text'
            placeholder='First name'
          ></Form.Control>
          <p className='text-white mt-1 text-muted'>{errors.firstName?.message}</p>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='text-white'>Last name</Form.Label>
          <Form.Control
            {...register('lastName', { required: 'Last name is required' })}
            aria-label='last-name-input'
            type='text'
            placeholder='Last name'
          ></Form.Control>
          <p className='text-white mt-1 text-muted'>{errors.lastName?.message}</p>
        </Form.Group>
        <Button className='m-4' type='submit' variant='success'>
          Create
        </Button>
        {newUser && (
          <p className='text-white'>
            Congrats! {newUser.first_name} {newUser.last_name} has been created.
          </p>
        )}
      </Form>
    </Container>
  );
}

export default CreateUser;
