import { describe, expect, it } from 'vitest';
import convertLogic from '../utils/convertLogic';

describe('logic test with valid numbers', () => {
  it('7 should return "seven"', () => {
    const result = convertLogic(7);
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

  it('3651010802 should return "three billion six hundred and fifty-one million ten thousand eight hundred and two"', () => {
    const result = convertLogic(3651010802);
    expect(result).toBe('three billion six hundred and fifty-one million ten thousand eight hundred and two');
  });

  it('999999999999 should return "nine hundred and ninety-nine billion nine hundred and ninety-nine million nine hundred and ninety-nine thousand nine hundred and ninety-nine"', () => {
    const result = convertLogic(999999999999);
    expect(result).toBe(
      'nine hundred and ninety-nine billion nine hundred and ninety-nine million nine hundred and ninety-nine thousand nine hundred and ninety-nine',
    );
  });
});

describe('logic test with British numbers', () => {
  it('1100 should return "eleven hundred"', () => {
    // given
    const language = 'british';
    // when
    const result = convertLogic(1100, language);
    // then
    expect(result).toBe('eleven hundred');
  });

  it('1203 should return "twelve hundred and three"', () => {
    // given
    const language = 'british';
    // when
    const result = convertLogic(1203, language);
    // then
    expect(result).toBe('twelve hundred and three');
  });

  it('1980 should return "nineteen hundred and eighty"', () => {
    // given
    const language = 'british';
    // when
    const result = convertLogic(1980, language);
    // then
    expect(result).toBe('nineteen hundred and eighty');
  });

  it('1999 should return "nineteen hundred and ninety-nine"', () => {
    // given
    const language = 'british';
    // when
    const result = convertLogic(1999, language);
    // then
    expect(result).toBe('nineteen hundred and ninety-nine');
  });
});
