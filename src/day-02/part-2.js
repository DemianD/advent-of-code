import { readFile } from 'fs/promises';

const input = await readFile('./data/input.txt', 'utf8');
const lines = input.split('\n');

const regex = /(\d+)-(\d+) (.): (.+)/;

const validPasswords = lines
  .map((line) => {
    const groups = line.match(regex);

    return {
      original: line,
      position1: Number(groups[1]),
      position2: Number(groups[2]),
      character: groups[3],
      password: groups[4],
    };
  })
  .filter(({ position1, position2, character, password }) => {
    const char1 = password.charAt(position1 - 1);
    const char2 = password.charAt(position2 - 1);

    if (char1 === char2) {
      return false;
    }

    return char1 === character || char2 === character;
  });

console.log({ numberOfValidPasswords: validPasswords.length });
