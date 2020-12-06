import { readFile } from 'fs/promises';

const input = await readFile('./src/day-04/data/input.txt', 'utf8');

export const rules = {
  byr: (birthYear) => birthYear >= 1920 && birthYear <= 2002,
  iyr: (issueYear) => issueYear >= 2010 && issueYear <= 2020,
  eyr: (experiationYear) => experiationYear >= 2020 && experiationYear <= 2030,
  hcl: (hairColor) => /^#[0-9a-f]{6}$/.test(hairColor),
  ecl: (eyeColor) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(eyeColor),
  pid: (passportID) => /^[0-9]{9}$/.test(passportID),
  hgt: (height) => {
    const groups = height.match(/^(\d+)(in|cm)$/);

    if (groups === null) {
      return false;
    }

    const heightNumber = groups[1];

    if (groups[2] === 'cm') {
      return heightNumber >= 150 && heightNumber <= 193;
    }

    if (groups[2] === 'in') {
      return heightNumber >= 59 && heightNumber <= 76;
    }

    return false;
  },
};

const countValidPassports = (_input) => {
  return (_input || input)
    .trim()
    .split(/\n\t*\r* *\n/)
    .map((passport) =>
      Object.fromEntries(
        passport
          .split('\n')
          .join(' ')
          .split(' ')
          .map((fieldWithValue) => fieldWithValue.split(':'))
      )
    )
    .filter((passport) => {
      const keys = Object.keys(passport);

      return Object.entries(rules).every(([name, test]) => {
        return keys.includes(name) && test(passport[name]);
      });
    }).length;
};

console.log(countValidPassports());
