/* testing utilities */
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* api mocking */
import { setupServer } from 'msw/node';
import { rest } from 'msw';
/* components */
import Home from '../pages/Home';
import { BrowserRouter } from 'react-router-dom';

describe('elements render on Home', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
  });

  it('loader animation should be defined', async () => {
    await screen.findByLabelText('spinner');

    expect(screen.getByLabelText('spinner')).toBeDefined();
  });

  it('Next button should be defined', async () => {
    await screen.findByRole('button', { name: 'next-button' });

    expect(screen.getByRole('button', { name: 'next-button' })).toBeDefined();
  });

  it('"Created at:" card nodes should be defined', async () => {
    await screen.findAllByText('Created at:');

    expect(screen.getAllByText('Created at:')).toBeDefined();
  });

  it('Switches should be defined', async () => {
    await screen.findAllByRole('checkbox');

    expect(screen.getAllByRole('checkbox')).toBeDefined();
  });
});
