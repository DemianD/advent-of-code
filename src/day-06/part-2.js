import { read } from '../utils.js';

export const countQuestionsPerGroup = (group) => {
  const uniqueQuestions = {};

  const numberOfPersons = group.split('\n').length;
  const persons = group.replace(/\s/g, '').split('');

  persons.forEach((question) => {
    uniqueQuestions[question] = (uniqueQuestions[question] || 0) + 1;
  });

  return Object.values(uniqueQuestions).filter((amount) => {
    return amount === numberOfPersons;
  }).length;
};

const calculate = async () => {
  const groups = (await read('./day-06/data/input.txt')).trim().split('\n\n');

  return groups.reduce((acc, group) => {
    return acc + countQuestionsPerGroup(group);
  }, 0);
};

// console.log(await calculate());
