const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tens = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

// 980.565.125

function convertLogic(num) {
  const input = num.toString();

  const digits = {
    hundredMillion: input.length === 9 ? input[input.length - 9] : undefined,
    tenMillion: input.length >= 8 ? input[input.length - 8] : undefined,
    million: input.length >= 7 ? input[input.length - 7] : undefined,
    hundredThousand: input.length >= 6 ? input[input.length - 6] : undefined,
    tenThousand: input.length >= 5 ? input[input.length - 5] : undefined,
    thousand: input.length >= 4 ? input[input.length - 4] : undefined,
    hundred: input.length >= 3 ? input[input.length - 3] : undefined,
    ten: input.length >= 2 ? input[input.length - 2] : undefined,
    one: input.length >= 1 ? input[input.length - 1] : undefined,
  };

  console.log(digits);
  return 'testing';
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
*/
