import { describe, expect, it } from 'vitest';
import App from './App';
import { render, screen, userEvent } from '../test-utils';

describe('simple working test', () => {
  it('should render homepage', () => {
    render(<App />);
  });
});
