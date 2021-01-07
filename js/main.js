var incomeBrackets = [
  { bracket: 0,
    rate: 0.00 },
  { bracket: 300000,
    rate: 0.075 },
  { bracket: 400000,
    rate: 0.080 },
  { bracket: 500000,
    rate: 0.085 },
  { bracket: 600000,
    rate: 0.090 },
  { bracket: 700000,
    rate: 0.095 },
  { bracket: 800000,
    rate: 0.100 },
  { bracket: 900000,
    rate: 0.110 },
  { bracket: 1000000,
    rate: 0.120 },
  { bracket: 5000000,
    rate: 0.130 },
  { bracket: 10000000,
    rate: 0.140 },
  { bracket: 100000000,
    rate: 0.150 },
]
var inheritanceBrackets = [
  { bracket: 0,
    rate: 0.000 },
  { bracket: 250000,
    rate: 0.050 },
  { bracket: 500000,
    rate: 0.150 },
  { bracket: 1000000,
    rate: 0.300 },
  { bracket: 2000000,
    rate: 0.400 },
  { bracket: 10000000,
    rate: 0.5 },
]

document.addEventListener('DOMContentLoaded', (event) => {
  
//    event.preventDefault();
  document.querySelector('#button').addEventListener('click', (event) => {
    event.preventDefault();
    const income = parseInt(document.querySelector('#income').value);
    const inheritance = parseInt(document.querySelector('#inheritance').value);
    const answer = document.querySelector('#answer');
    const inhAnswer = document.querySelector('#answer');
    const incomeBracket = findBracket(income, incomeBrackets);
    const inheritanceBracket = findBracket(inheritance, inheritanceBrackets);
    maxPerBracket(incomeBrackets);
    maxPerBracket(inheritanceBrackets);
    console.log(" =================== income ====================");
    console.log(`income is \$${income.toLocaleString()}`);
    console.log(`tax bracket is: ${incomeBrackets.indexOf(incomeBracket)}: ${incomeBracket.bracket}`);
    const incomeTax = calculateTax(income, incomeBracket);
    console.table(incomeBrackets);
    console.log("================= inheritance ==================");
    console.log(`inheritance is \$${inheritance}`);
    console.log(`tax bracket is: ${inheritanceBrackets.indexOf(inheritanceBracket)}: ${inheritanceBracket.bracket}`);
    const inheritanceTax = calculateTax(inheritance, inheritanceBracket);
    console.table(inheritanceBrackets);
    answer.innerHTML = `Your tax on inheritance is \$${inheritanceTax.toLocaleString()} and your income tax is \$${incomeTax.toLocaleString()}<br>`;
    answer.innerHTML += `Total tax: \$${(inheritanceTax + incomeTax).toLocaleString()}`;
  })
  

})
function findBracket(income, brackets) {
  for (let i = 0; i < brackets.length; i++) {
    if (income < brackets[i].bracket) {
      return brackets[i-1];
    }
  }
  return brackets[brackets.length - 1];
}

function maxPerBracket (brackets) {
  var previousMax = 0.00;
  for (let i = 0; i < brackets.length - 1; i++) {
    // get max income within current bracket
    maxDollars = brackets[i+1].bracket - brackets[i].bracket;
    // get max mount that could be taxed within bracket
    maxTaxed = maxDollars * brackets[i].rate
    // get cummulative max
    maxCummulative = maxTaxed + previousMax;
    // assign these to brackets array
    brackets[i].maxDollars = maxDollars;
    brackets[i].maxTaxed = maxTaxed;
    brackets[i+1].previousMaxCummulative = maxCummulative;
    // assign max to previousMax for next iteration
    previousMax = maxCummulative;
  }
  brackets[0].previousMaxCummulative = 0;
}

function calculateTax(income, bracket) {
  console.log(`remainder is ${income - bracket.bracket}`)
  return bracket.previousMaxCummulative + ((income - bracket.bracket) * bracket.rate);
}