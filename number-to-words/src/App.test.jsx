import { describe, expect, it } from 'vitest';
import App from './App';
import { render, screen, userEvent } from '../test-utils';

describe('App render test', () => {
  it('form label should be in the DOM', () => {
    render(<App />);

    expect(screen.getByText('Arabic number conversion tool')).toBeInTheDocument();
  });

  it('button should be disabled on load', () => {
    render(<App />);

    expect(screen.getByRole('button')).toBeDisabled();
  });
});

describe('input validation with valid numbers', () => {
  it('button should be enabled when typing 1 into input field', async () => {
    render(<App />);

    const input = screen.getByLabelText('input');
    const button = screen.getByRole('button');

    await userEvent.type(input, '1');

    expect(button).toBeEnabled();
  });

  it('button should be enabled when typing 100 into input field', async () => {
    render(<App />);

    const input = screen.getByLabelText('input');
    const button = screen.getByRole('button');

    await userEvent.type(input, '2022');

    expect(button).toBeEnabled();
  });

  it('button should be enabled when typing 999999999 into input field', async () => {
    render(<App />);

    const input = screen.getByLabelText('input');
    const button = screen.getByRole('button');

    await userEvent.type(input, '999999999');

    expect(button).toBeEnabled();
  });
});

describe('input validation with invalid numbers', () => {
  it('button should be disabled when typing 0 into input field', async () => {
    render(<App />);

    const input = screen.getByLabelText('input');
    const button = screen.getByRole('button');

    await userEvent.type(input, '0');

    expect(button).toBeDisabled();
  });

  it('button should be disabled when typing a negative number into input field', async () => {
    render(<App />);

    const input = screen.getByLabelText('input');
    const button = screen.getByRole('button');

    await userEvent.type(input, '-1');

    expect(button).toBeDisabled();
  });

  it('button should be disabled when typing a too large number into input field', async () => {
    render(<App />);

    const input = screen.getByLabelText('input');
    const button = screen.getByRole('button');

    await userEvent.type(input, '9999999991');

    expect(button).toBeDisabled();
  });

  it('button should be disabled when typing invalid characters into input field', async () => {
    render(<App />);

    const input = screen.getByLabelText('input');
    const button = screen.getByRole('button');

    await userEvent.type(input, ',--');

    expect(button).toBeDisabled();
  });

  it('button should be disabled when a number is not an integer', async () => {
    render(<App />);

    const input = screen.getByLabelText('input');
    const button = screen.getByRole('button');

    await userEvent.type(input, '35.2');

    expect(button).toBeDisabled();
  });
});

describe('render results', () => {
  it('the converted number should render (as a number)', async () => {
    render(<App />);

    const input = screen.getByLabelText('input');
    const button = screen.getByRole('button');

    await userEvent.type(input, '2001');
    await userEvent.click(button);

    expect(screen.getByText('2001')).toBeInTheDocument();
  });

  it('the converted English phrase should render', async () => {
    render(<App />);

    const input = screen.getByLabelText('input');
    const button = screen.getByRole('button');

    await userEvent.type(input, '2001');
    await userEvent.click(button);

    expect(screen.getByText('two thousand and one')).toBeInTheDocument();
  });
});
