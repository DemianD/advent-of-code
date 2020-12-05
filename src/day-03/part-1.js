import { readFile } from 'fs/promises';

const input = await readFile('./data/input.txt', 'utf8');
const lines = input.trim().split('\n');

const TREE = '#';
const m = lines[0].length;

let j = 0;
let numberOfTrees = 0;

for (let i = 0; i < lines.length - 1; i++) {
  j = (j + 3) % m;

  if (lines[i + 1][j] === TREE) {
    numberOfTrees++;
  }
}

console.log({ numberOfTrees });
