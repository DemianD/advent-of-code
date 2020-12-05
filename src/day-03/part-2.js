import { readFile } from 'fs/promises';

const input = await readFile('./data/input.txt', 'utf8');
const lines = input.trim().split('\n');

const TREE = '#';
const m = lines[0].length;

const indices = {
  RIGHT: 0,
  DOWN: 1,
  RIGHT_INDEX: 2,
  TREES: 3,
};

// right - down - right index - trees
const steps = [
  [1, 1, 0, 0],
  [3, 1, 0, 0],
  [5, 1, 0, 0],
  [7, 1, 0, 0],
  [1, 2, 0, 0],
];

for (let i = 0; i < lines.length - 1; i++) {
  for (let s = 0; s < steps.length; s++) {
    const [right, down] = steps[s];

    const ix = down * (i + 1);

    if (ix >= lines.length) {
      continue;
    }

    steps[s][indices.RIGHT_INDEX] = (steps[s][indices.RIGHT_INDEX] + right) % m;

    if (lines[ix][steps[s][indices.RIGHT_INDEX]] === TREE) {
      steps[s][indices.TREES]++;
    }
  }
}

const result = steps.reduce((acc, step) => {
  return acc * step[indices.TREES];
}, 1);

console.log({ result });
