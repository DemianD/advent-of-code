import { read } from '../utils.js';

const calculateBags = (line) => {
  const [bag, rest] = line
    .replace(/bag[s]?[,|.]?/g, '')
    .split(' contain ')
    .map((x) => x.trim());

  const bags = rest.split('  ').map((x) => {
    const [amount, ...names] = x.split(' ');
    return names.join(' ');
  });

  return [bag, bags];
};

const visitedNodes = {};
const result = {};

const calculateHelper = (node, bags, nodes) => {
  if (visitedNodes[node] === true) {
    // Path already handled or handling
    return result[node];
  }

  visitedNodes[node] = true;

  if (node === 'other') {
    return false;
  }

  if (node === 'shiny gold') {
    return true;
  }

  return (result[node] = !!bags
    .map((bag) => calculateHelper(bag, nodes[bag], nodes))
    .filter(Boolean).length);
};

const calculate = async () => {
  const lines = (await read('./day-07/data/input.txt')).trim().split('\n');
  const nodes = Object.fromEntries(lines.map(calculateBags));

  Object.entries(nodes).forEach(([node, bags]) => calculateHelper(node, bags, nodes));

  return Object.values(result).filter(Boolean).length;
};

console.log(await calculate());
