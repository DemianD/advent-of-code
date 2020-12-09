import { read } from '../utils.js';

const calculateBags = (line) => {
  const [bag, rest] = line
    .replace(/bag[s]?[,|.]?/g, '')
    .split(' contain ')
    .map((x) => x.trim());

  const bags = rest
    .split('  ')
    .map((x) => {
      const [amount, ...names] = x.split(' ');

      return amount === 'no'
        ? false
        : {
            amount: Number(amount),
            name: names.join(' '),
          };
    })
    .filter(Boolean);

  return [bag, bags];
};

const lines = (await read('./day-07/data/input.txt')).trim().split('\n');
const nodes = Object.fromEntries(lines.map(calculateBags));

const calculate = (node) => {
  return nodes[node].reduce((acc, { amount, name }) => {
    return acc + amount + amount * calculate(name);
  }, 0);
};

console.log(calculate('shiny gold'));
