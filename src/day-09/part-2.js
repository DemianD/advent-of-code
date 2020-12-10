import { read } from '../utils.js';

let numbers = (await read('./day-09/data/input.txt')).trim().split('\n').map(Number);

const calculate = (invalidNumber) => {
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const subset = numbers.slice(i, j + 1);
      const total = subset.reduce((acc, item) => acc + item, 0);

      if (total === invalidNumber) {
        const first = Math.max(...subset);
        const last = Math.min(...subset);

        console.log({ first, last, result: first + last });

        return;
      }
    }
  }
};

// calculate(127);
calculate(1212510616);
