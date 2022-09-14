/* testing utilities */
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* api mocking */
import { setupServer } from 'msw/node';
import { rest } from 'msw';
/* components */
import CreateUser from '../pages/CreateUser';
import { BrowserRouter } from 'react-router-dom';

describe('elements render on Create', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <CreateUser />
      </BrowserRouter>,
    );
  });

  it('title should be defined', async () => {
    await screen.findByText('Create a new user');

    expect(screen.getByText('Create a new user')).toBeDefined();
  });

  it('Create button should be defined', async () => {
    await screen.findByRole('button', { name: 'Create' });

    expect(screen.getByRole('button', { name: 'Create' })).toBeDefined();
  });

  it('First name input should be defined', async () => {
    await screen.findByLabelText('first-name-input');

    expect(screen.getByLabelText('first-name-input')).toBeDefined();
  });

  it('Last name input should be defined', async () => {
    await screen.findByLabelText('last-name-input');

    expect(screen.getByLabelText('last-name-input')).toBeDefined();
  });
});

describe('input validation on Create', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <CreateUser />
      </BrowserRouter>,
    );
  });

  it('missing last name should display error message', async () => {
    const input = await screen.findByLabelText('first-name-input');
    const button = await screen.findByRole('button', { name: 'Create' });

    await userEvent.type(input, 'Jimmy');
    await userEvent.click(button);

    const error = await screen.findByText('Last name is required');

    expect(error).toBeDefined();
  });

  it('missing first name should display error message', async () => {
    const input = await screen.findByLabelText('last-name-input');
    const button = await screen.findByRole('button', { name: 'Create' });

    await userEvent.type(input, 'Johnson');
    await userEvent.click(button);

    const error = await screen.findByText('First name is required');

    expect(error).toBeDefined();
  });
});

describe('successful user creation', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <CreateUser />
      </BrowserRouter>,
    );
  });

  it('creating a new user should display success message', async () => {
    const firstName = await screen.findByLabelText('first-name-input');
    const lastName = await screen.findByLabelText('last-name-input');
    const button = await screen.findByRole('button', { name: 'Create' });

    await userEvent.type(firstName, 'John Killer');
    await userEvent.type(lastName, 'Doe');
    await userEvent.click(button);

    const success = await screen.findByText('Congrats! John Killer Doe has been created.');

    expect(success).toBeDefined();
  });
});
