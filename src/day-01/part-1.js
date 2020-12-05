import { readFile } from 'fs/promises';

const input = await readFile('./data/input.txt', 'utf8');

const numbers = input
  .split('\n')
  .map(Number)
  .sort((a, b) => a - b);

for (let i = 0; i < numbers.length; i++) {
  let j = numbers.length - 1;

  while (numbers[i] + numbers[j] > 2020) {
    j--;
  }

  if (j <= 0) {
    continue;
  }

  if (numbers[i] + numbers[j] === 2020) {
    console.log({
      x: numbers[i],
      y: numbers[j],
      result: numbers[i] * numbers[j],
    });
  }
}
