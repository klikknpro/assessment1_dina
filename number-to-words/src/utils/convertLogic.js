const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tens = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

// 980.565.125

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

  if (digits.hundredMillion) phrase.push(ones[digits.hundredMillion], 'hundred');

  if (digits.tenMillion === 1) phrase.push(teens[digits.million]);

  if (digits.tenMillion >= 2) phrase.push(tens[digits.tenMillion - 2], '-');

  if (digits.million >= 1 && digits.tenMillion >= 2) phrase.push(ones[digits.million]);
  if (digits.tenMillion === 0 && digits.million >= 1) phrase.push(ones[digits.million]);
  if (digits.tenMillion === undefined && digits.million >= 1) phrase.push(ones[digits.million]);

  if (digits.million >= 0) phrase.push('million');

  console.log(digits);
  // ones[digits.hundredMillion] ((tens[digits.tenMillion] ones[digits.million]) || teens[digits.tenMillion]) hundred(if digits.hundredMillion true) million(if digits.million true)

  return phrase.join(' ');
}

export default convertLogic;

/*
999.999.999
nine hundred ninety-nine million * nine hundred ninety-nine thousand * nine hundred and ninety-nine
*/

/*
input -> object (number)
business logic test (jest)
+ testing-library
!!! negativ, tort szamok
! must not start with 0
*/
/*
  const hundredMillionSuffix = digits.hundredMillion ? 'hundred' : '';
  const millionSuffixMillion = digits.million ? 'million' : '';
  const hundredThousandSuffix = digits.hundredThousand ? 'hundred' : '';
  const thousandSuffix = digits.thousand ? 'thousand' : '';
  const hundredSuffix = digits.hundred ? 'hundred' : '';
*/
