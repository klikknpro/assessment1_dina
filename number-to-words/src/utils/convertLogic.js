const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tens = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
let phrase = [];

/* === *** === */
// NEW LOGIC
/* === *** === */

const convertGroup = (hundredDigit, tenDigit, oneDigit, group) => {
  if (group === 'one') {
    if (hundredDigit === 0) {
      if (tenDigit >= 1 || oneDigit >= 1) phrase.push('and');
    }
  }

  if (hundredDigit) {
    phrase.push(ones[hundredDigit], 'hundred');
    if (tenDigit >= 1 || oneDigit >= 1) phrase.push('and');
  }

  if (tenDigit === 1) phrase.push(teens[oneDigit]);

  if (tenDigit >= 2) {
    phrase.push(tens[tenDigit - 2]);
    if (oneDigit >= 1) phrase.push('-');
  }

  if (oneDigit >= 1 && tenDigit >= 2) phrase.push(ones[oneDigit]);
  if (tenDigit === 0 && oneDigit >= 1) phrase.push(ones[oneDigit]);
  if (tenDigit === undefined && oneDigit >= 1) phrase.push(ones[oneDigit]);

  if (group === 'billion') {
    if (oneDigit >= 0) phrase.push('billion');
  } else if (group === 'million') {
    if (oneDigit >= 0) phrase.push('million');
  } else if (group === 'thousand') {
    if (hundredDigit >= 1 || tenDigit >= 1 || oneDigit >= 1) phrase.push('thousand');
  }
};

function convertLogic(num, language) {
  phrase = [];
  const input = num.toString();

  const digits = {
    hundredBillion: input.length === 12 ? parseInt(input[input.length - 12]) : undefined,
    tenBillion: input.length >= 11 ? parseInt(input[input.length - 11]) : undefined,
    billion: input.length >= 10 ? parseInt(input[input.length - 10]) : undefined,
    hundredMillion: input.length >= 9 ? parseInt(input[input.length - 9]) : undefined,
    tenMillion: input.length >= 8 ? parseInt(input[input.length - 8]) : undefined,
    million: input.length >= 7 ? parseInt(input[input.length - 7]) : undefined,
    hundredThousand: input.length >= 6 ? parseInt(input[input.length - 6]) : undefined,
    tenThousand: input.length >= 5 ? parseInt(input[input.length - 5]) : undefined,
    thousand: input.length >= 4 ? parseInt(input[input.length - 4]) : undefined,
    hundred: input.length >= 3 ? parseInt(input[input.length - 3]) : undefined,
    ten: input.length >= 2 ? parseInt(input[input.length - 2]) : undefined,
    one: input.length >= 1 ? parseInt(input[input.length - 1]) : undefined,
  };

  // british 1100 - 1999
  const isBritish = language === 'british' && num >= 1100 && num <= 1999;
  if (isBritish) {
    phrase.push(teens[digits.hundred], 'hundred');
    if (digits.ten >= 1 || digits.one >= 1) {
      phrase.push('and');
      if (digits.ten === 1) phrase.push(teens[digits.one]);

      if (digits.ten >= 2) {
        phrase.push(tens[digits.ten - 2]);
        if (digits.one >= 1) phrase.push('-');
      }

      if (digits.one >= 1 && digits.ten >= 2) phrase.push(ones[digits.one]);
      if (digits.ten === 0 && digits.one >= 1) phrase.push(ones[digits.one]);
      if (digits.ten === undefined && digits.one >= 1) phrase.push(ones[digits.one]);
    }

    return phrase.join(' ').replaceAll(' - ', '-');
  }

  convertGroup(digits.hundredBillion, digits.tenBillion, digits.billion, 'billion');
  convertGroup(digits.hundredMillion, digits.tenMillion, digits.million, 'million');
  convertGroup(digits.hundredThousand, digits.tenThousand, digits.thousand, 'thousand');
  convertGroup(digits.hundred, digits.ten, digits.one, 'one');

  const result = phrase.join(' ').replaceAll(' - ', '-');

  return result;
}

export default convertLogic;
