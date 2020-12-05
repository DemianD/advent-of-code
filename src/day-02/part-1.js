import { readFile } from 'fs/promises';

const input = await readFile('./data/input.txt', 'utf8');
const lines = input.split('\n');

const regex = /(\d+)-(\d+) (.): (.+)/;

const validPasswords = lines
  .map((line) => {
    const groups = line.match(regex);

    return {
      original: line,
      lowest: Number(groups[1]),
      highest: Number(groups[2]),
      character: groups[3],
      password: groups[4],
    };
  })
  .filter(({ lowest, highest, character, password }) => {
    const count = password.split('').filter((x) => x === character).length;

    return count >= lowest && count <= highest;
  });

console.log({ numberOfValidPasswords: validPasswords.length });
