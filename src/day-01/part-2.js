import { readFile } from 'fs/promises';

const input = await readFile('./data/input.txt', 'utf8');

const numbers = input.split('\n').map(Number);

for (let i = 0; i < numbers.length - 2; i++) {
  for (let j = i + 1; j < numbers.length - 1; j++) {
    for (let k = j + 1; k < numbers.length; k++) {
      if (numbers[i] + numbers[j] + numbers[k] === 2020) {
        console.log({
          x: numbers[i],
          y: numbers[j],
          z: numbers[k],
          result: numbers[i] * numbers[j] * numbers[k],
        });
      }
    }
  }
}
