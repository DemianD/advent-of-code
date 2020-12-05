import { readFile } from 'fs/promises';

const input = await readFile('./data/input.txt', 'utf8');
const passports = input.trim().split('\n\n');

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const result = passports.filter((passport) => {
  return requiredFields.every((field) => passport.includes(field));
}).length;

console.log({ result });
