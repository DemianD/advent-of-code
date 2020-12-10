import { read } from '../utils.js';

let ratings = (await read('./day-10/data/input.txt'))
  .trim()
  .split('\n')
  .map(Number)
  .sort((a, b) => a - b);

const calculate = (input) => {
  const ratings = [0, ...input];
  const combinations = ratings.map(() => 0);

  combinations[0] = 1;

  for (let i = 1; i < ratings.length; i++) {
    for (let j = i - 3; j < i; j++) {
      if (j >= 0 && ratings[j] + 3 >= ratings[i]) {
        combinations[i] += combinations[j];
      }
    }
  }

  return combinations[combinations.length - 1];
};

// 0, 1, 4, 5, 6, 7
console.log(calculate(ratings));

export default calculate;
