/* testing utilities */
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* api mocking */
import { setupServer } from 'msw/node';
import { rest } from 'msw';
/* components */
import App from './App';
import Home from './pages/Home';
import { BrowserRouter } from 'react-router-dom';

describe('mock api calls', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
  });
});
