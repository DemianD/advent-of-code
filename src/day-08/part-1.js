import { read } from '../utils.js';

let statements = (await read('./day-08/data/input.txt')).trim().split('\n');

let set = new Set();
let accumulator = 0;
let currentStatement = 0;

let execute = {
  nop: () => 1,
  jmp: (arg) => Number(arg),
  acc: (arg) => {
    accumulator += Number(arg);
    return 1;
  },
};

while (!set.has(currentStatement)) {
  set.add(currentStatement);

  const [type, arg] = statements[currentStatement].split(' ');
  currentStatement += execute[type](arg);
}

console.log(accumulator);
