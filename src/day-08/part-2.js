import { read } from '../utils.js';

let originalStatements = (await read('./day-08/data/input.txt')).trim().split('\n');
let numberOfStatements = originalStatements.length;

let accumulator = 0;

const executeStatements = (statements) => {
  let set = new Set();
  let currentStatement = 0;

  accumulator = 0;

  let execute = {
    nop: () => 1,
    jmp: (arg) => Number(arg),
    acc: (arg) => ((accumulator += Number(arg)), 1),
  };

  while (currentStatement < numberOfStatements && !set.has(currentStatement)) {
    set.add(currentStatement);

    const [type, arg] = statements[currentStatement].split(' ');
    currentStatement += execute[type](arg);
  }

  return {
    isTerminating: currentStatement >= numberOfStatements,
    accumulator,
  };
};

originalStatements.find((_, i) => {
  const copy = { ...originalStatements };

  if (copy[i].startsWith('nop')) {
    copy[i] = copy[i].replace('nop', 'jmp');
    return executeStatements(copy).isTerminating;
  }

  if (copy[i].startsWith('jmp')) {
    copy[i] = copy[i].replace('jmp', 'nop');
    return executeStatements(copy).isTerminating;
  }

  return false;
});

console.log({ accumulator });
