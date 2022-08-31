const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tens = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function convertLogic(num) {
  const input = num.toString();

  const phrase = [];

  const digits = {
    hundredMillion: input.length === 9 ? parseInt(input[input.length - 9]) : undefined,
    tenMillion: input.length >= 8 ? parseInt(input[input.length - 8]) : undefined,
    million: input.length >= 7 ? parseInt(input[input.length - 7]) : undefined,
    hundredThousand: input.length >= 6 ? parseInt(input[input.length - 6]) : undefined,
    tenThousand: input.length >= 5 ? parseInt(input[input.length - 5]) : undefined,
    thousand: input.length >= 4 ? parseInt(input[input.length - 4]) : undefined,
    hundred: input.length >= 3 ? parseInt(input[input.length - 3]) : undefined,
    ten: input.length >= 2 ? parseInt(input[input.length - 2]) : undefined,
    one: input.length >= 1 ? parseInt(input[input.length - 1]) : undefined,
  };

  // XXX.000.000
  if (digits.hundredMillion) {
    phrase.push(ones[digits.hundredMillion], 'hundred');
    if (digits.tenMillion >= 1 || digits.million >= 1) phrase.push('and');
  }

  if (digits.tenMillion === 1) phrase.push(teens[digits.million]);

  if (digits.tenMillion >= 2) {
    phrase.push(tens[digits.tenMillion - 2]);
    if (digits.million >= 1) phrase.push('-');
  }

  if (digits.million >= 1 && digits.tenMillion >= 2) phrase.push(ones[digits.million]);
  if (digits.tenMillion === 0 && digits.million >= 1) phrase.push(ones[digits.million]);
  if (digits.tenMillion === undefined && digits.million >= 1) phrase.push(ones[digits.million]);

  if (digits.million >= 0) phrase.push('million');

  // 000.XXX.000
  if (digits.hundredThousand) {
    phrase.push(ones[digits.hundredThousand], 'hundred');
    if (digits.tenThousand >= 1 || digits.thousand >= 1) phrase.push('and');
  }

  if (digits.tenThousand === 1) phrase.push(teens[digits.thousand]);

  if (digits.tenThousand >= 2) {
    phrase.push(tens[digits.tenThousand - 2]);
    if (digits.thousand >= 1) phrase.push('-');
  }

  if (digits.thousand >= 1 && digits.tenThousand >= 2) phrase.push(ones[digits.thousand]);
  if (digits.tenThousand === 0 && digits.thousand >= 1) phrase.push(ones[digits.thousand]);
  if (digits.tenThousand === undefined && digits.thousand >= 1) phrase.push(ones[digits.thousand]);

  if (digits.hundredThousand >= 1 || digits.tenThousand >= 1 || digits.thousand >= 1) phrase.push('thousand');

  // 000.000.XXX
  if (digits.hundred === 0) {
    if (digits.ten >= 1 || digits.one >= 1) phrase.push('and');
  }

  if (digits.hundred) {
    phrase.push(ones[digits.hundred], 'hundred');
    if (digits.ten >= 1 || digits.one >= 1) phrase.push('and');
  }

  if (digits.ten === 1) phrase.push(teens[digits.one]);

  if (digits.ten >= 2) {
    phrase.push(tens[digits.ten - 2]);
    if (digits.one >= 1) phrase.push('-');
  }

  if (digits.one >= 1 && digits.ten >= 2) phrase.push(ones[digits.one]);
  if (digits.ten === 0 && digits.one >= 1) phrase.push(ones[digits.one]);
  if (digits.ten === undefined && digits.one >= 1) phrase.push(ones[digits.one]);

  const result = phrase.join(' ').replace(' - ', '-');

  return result;
}

export default convertLogic;

/*
input -> object (number)
business logic test (jest)
+ testing-library
!!! negativ, tort szamok
! must not start with 0
*/
