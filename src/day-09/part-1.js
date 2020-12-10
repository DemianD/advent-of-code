import { read } from '../utils.js';

const PREAMBLE = 25;

let numbers = (await read('./day-09/data/input.txt')).trim().split('\n').map(Number);
let remaining = numbers.slice(0, PREAMBLE);

let currentIndex = PREAMBLE;

for (currentIndex; currentIndex < numbers.length; currentIndex++) {
  let i = 0;
  let j = remaining.length - 1;
  let remainingSorted = [...remaining].sort((a, b) => a - b);

  while (i < j && remainingSorted[i] + remainingSorted[j] !== numbers[currentIndex]) {
    if (remainingSorted[i] + remainingSorted[j] > numbers[currentIndex]) {
      j--;
    } else if (remainingSorted[i] + remainingSorted[j] < numbers[currentIndex]) {
      i++;
    }
  }

  if (remainingSorted[i] + remainingSorted[j] !== numbers[currentIndex]) {
    console.log({ answer: numbers[currentIndex] });
    break;
  }

  remaining.shift();
  remaining.push(numbers[currentIndex]);
}
