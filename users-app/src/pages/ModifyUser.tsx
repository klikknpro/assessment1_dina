import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Container, Form } from 'react-bootstrap';
import { getUser, editUserNames } from '../api/diNaUsers';
import { FormData, FormError, User } from '../utils/interfaces';

function ModifyUser() {
  const [placeholderName, setPlaceholderName] = useState<User | undefined>(undefined);
  const [serverError, setServerError] = useState<FormError | undefined>(undefined);
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
    // eslint-disable-next-line no-prototype-builtins
    if (modifiedUser.hasOwnProperty('id')) {
      setPlaceholderName(modifiedUser as User);
      setServerError(undefined);
      setDone(true);
    } else {
      setServerError(modifiedUser as FormError);
    }
  };

  useEffect(() => {
    let ignore = false;

    async function fetchUser() {
      const response = await getUser(id);
      if (response && !ignore) setPlaceholderName(response as User);
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
            Current first name: <span className='text-wrap bg-success badge fs-6'>{placeholderName?.first_name}</span>
          </Form.Label>
          <Form.Control
            {...register('firstName', { required: 'New first name is required' })}
            placeholder='New first name'
            aria-label='edit-first-name-input'
            type='text'
          ></Form.Control>
          <p className='text-white mt-1 text-muted'>{errors.firstName?.message}</p>
          {serverError && serverError.first_name ? (
            <p className='text-white mt-1 text-muted'>{serverError.first_name[0]}</p>
          ) : (
            <></>
          )}
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='text-white'>
            Current last name: <span className='text-wrap bg-success badge fs-6'>{placeholderName?.last_name}</span>
          </Form.Label>
          <Form.Control
            {...register('lastName', { required: 'New last name is required' })}
            placeholder='New last name'
            aria-label='edit-last-name-input'
            type='text'
          ></Form.Control>
          <p className='text-white mt-1 text-muted'>{errors.lastName?.message}</p>
          {serverError && serverError.last_name ? (
            <p className='text-white mt-1 text-muted'>{serverError.last_name[0]}</p>
          ) : (
            <></>
          )}
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

/*
, { required: 'New first name is required' }
*/
