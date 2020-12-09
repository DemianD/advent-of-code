import { read } from '../utils.js';

export const countQuestionsPerGroup = (group) => {
  const uniqueQuestions = new Set();

  group
    .replace(/\s/g, '')
    .split('')
    .forEach((question) => uniqueQuestions.add(question));

  return uniqueQuestions.size;
};

const calculate = async () => {
  const groups = (await read('./day-06/data/input.txt')).trim().split('\n\n');

  return groups.reduce((acc, group) => {
    return acc + countQuestionsPerGroup(group);
  }, 0);
};

// console.log(await calculate());
