import { read } from '../utils.js';

const [_, rawBusLines] = (await read('./day-13/data/input.txt')).trim().split('\n');

const busLines = rawBusLines
  .split(',')
  .map((line, i) => [i, line])
  .filter(([_, line]) => line !== 'x')
  .map(([i, line]) => [i, Number(line)])
  .sort(([_a, lineA], [_b, lineB]) => lineB - lineA); // sorting on largest ID (largest step)

let i = 0;
let step = 1;

busLines.forEach(([t, busLine]) => {
  while ((i + t) % busLine !== 0) {
    i += step;
  }

  step *= busLine;
});

console.log({ i, step });
