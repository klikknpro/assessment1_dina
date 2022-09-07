import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App render test', () => {
  it('title should show', () => {
    render(<App />);

    expect(screen.getByText('hey')).toBeDefined();
  });
});
