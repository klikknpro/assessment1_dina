const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tens = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

const convertHundredMillions = (num) => {
  // 999.999.999
  if (num >= 100000000) {
    return convertHundreds(Math.floor(num / 1000000)) + ' ' + 'million';
  }
};

const convertHundreds = (num) => {
  if (num % 100 === 0) return ones[num.toString()[0]] + ' ' + 'hundred';

  if (num % 100 >= 10 && num % 100 <= 19) {
    return ones[num.toString()[0]] + ' ' + 'hundred' + ' ' + convertTeens(num % 100);
  }
};

const convertTeens = (num) => {
  return teens[num.toString()[1]];
};

function convertLogic(num) {
  const phrase = [];
  phrase.push(convertHundredMillions(num));
  return phrase.join(' ');
}

export default convertLogic;

/*
999.999.999
nine hundred ninety-nine million * nine hundred ninety-nine thousand * nine hundred and ninety-nine
*/
