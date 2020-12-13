import { read } from '../utils.js';

const [departTimestamp, rawBusLines] = (await read('./day-13/data/input.txt')).trim().split('\n');
const busLines = rawBusLines.split(',').filter((id) => id !== 'x');

const [id, time] = busLines
  .map((busLine) => {
    return [busLine, Math.ceil(departTimestamp / busLine) * busLine];
  })
  .sort(([_a, timeA], [_b, timeB]) => timeA - timeB)[0];

const result = (time - departTimestamp) * id;
console.log({ result });
