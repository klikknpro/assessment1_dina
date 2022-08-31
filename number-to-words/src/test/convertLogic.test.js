import { describe, expect, it } from 'vitest';
import convertLogic from '../utils/convertLogic';

describe('logic test with valid numbers', () => {
  it('7 should return "seven"', () => {
    const result = convertLogic(7);
    const expectedResult = 'seven';
    expect(result).toEqual(expectedResult);
  });
});
