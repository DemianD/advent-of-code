import { read } from '../utils.js';

let ratings = (await read('./day-10/data/input.txt'))
  .trim()
  .split('\n')
  .map(Number)
  .sort((a, b) => a - b);

ratings = [0, ...ratings, ratings[ratings.length - 1] + 3];

const calculate = () => {
  let i = 1;
  let differences = { 1: 0, 3: 0 };

  while (i < ratings.length) {
    differences[ratings[i] - ratings[i - 1]]++;
    i += 1;
  }

  return differences[1] * differences[3];
};

console.log(calculate());
