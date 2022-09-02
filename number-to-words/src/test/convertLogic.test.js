import { describe, expect, it } from 'vitest';
import convertLogic from '../utils/convertLogic';

describe('logic test with valid numbers', () => {
  it('7 should return "seven"', () => {
    // given
    // when
    const result = convertLogic(7);
    // then
    expect(result).toBe('seven');
  });

  it('42 should return "forty-two"', () => {
    const result = convertLogic(42);
    expect(result).toBe('forty-two');
  });

  it('130 should return "one hundred and thirty"', () => {
    const result = convertLogic(130);
    expect(result).toBe('one hundred and thirty');
  });

  it('1999 should return "one thousand nine hundred and ninety-nine"', () => {
    const result = convertLogic(1999);
    expect(result).toBe('one thousand nine hundred and ninety-nine');
  });

  it('2001 should return "two thousand and one"', () => {
    const result = convertLogic(2001);
    expect(result).toBe('two thousand and one');
  });

  it('2012 should return "two thousand and twelve"', () => {
    const result = convertLogic(2012);
    expect(result).toBe('two thousand and twelve');
  });

  it('17999 should return "seventeen thousand nine hundred and ninety-nine"', () => {
    const result = convertLogic(17999);
    expect(result).toBe('seventeen thousand nine hundred and ninety-nine');
  });

  it('100001 should return "one hundred thousand and one"', () => {
    const result = convertLogic(100001);
    expect(result).toBe('one hundred thousand and one');
  });

  it('342251 should return "three hundred and forty-two thousand two hundred and fifty-one"', () => {
    const result = convertLogic(342251);
    expect(result).toBe('three hundred and forty-two thousand two hundred and fifty-one');
  });

  it('1300420 should return "one million three hundred thousand four hundred and twenty"', () => {
    const result = convertLogic(1300420);
    expect(result).toBe('one million three hundred thousand four hundred and twenty');
  });

  it('999999999 should return "nine hundred and ninety-nine million nine hundred and ninety-nine thousand nine hundred and ninety-nine"', () => {
    const result = convertLogic(999999999);
    expect(result).toBe('nine hundred and ninety-nine million nine hundred and ninety-nine thousand nine hundred and ninety-nine');
  });
});
