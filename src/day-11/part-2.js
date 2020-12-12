import { read } from '../utils.js';

let lines = (await read('./day-11/data/input.txt'))
  .trim()
  .split('\n')
  .map((x) => x.split(''));

const numberOfRows = lines.length;
const numberOfColumns = lines[0].length;

const seesOccupiedSeat = (lines, originalI, originalJ, iFactor, jFactor, borderAsEmpty, find) => {
  let i = originalI + iFactor;
  let j = originalJ + jFactor;

  const valid = (i, j) => i >= 0 && j >= 0 && i < numberOfRows && j < numberOfColumns;

  while (valid(i, j) && lines[i][j] === '.') {
    i += iFactor;
    j += jFactor;
  }

  return valid(i, j) && lines[i][j] === '#';
};

const occupiedAdjacentSeats = (lines, i, j, borderAsEmpty, find) => {
  const positions = [
    [-1, 0], // top
    [+1, 0], // bottom
    [0, -1], // left
    [0, +1], // right
    [-1, -1], // top left
    [-1, +1], // top right
    [+1, -1], // bottom left
    [+1, +1], // bottom right
  ];

  return positions.reduce((acc, [iFactor, jFactor]) => {
    return (acc += seesOccupiedSeat(lines, i, j, iFactor, jFactor, borderAsEmpty, find) ? 1 : 0);
  }, 0);
};

let changed = true;
let tempLines;

while (changed) {
  changed = false;
  tempLines = JSON.parse(JSON.stringify(lines));

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === 'L' && occupiedAdjacentSeats(lines, i, j, true, ['.', 'L']) === 0) {
        tempLines[i][j] = '#';
        changed = true;
      } else if (lines[i][j] === '#' && occupiedAdjacentSeats(lines, i, j, false, ['#']) >= 5) {
        tempLines[i][j] = 'L';
        changed = true;
      }
    }
  }

  lines = tempLines;
}

const count = lines.reduce((acc, line) => {
  return acc + line.reduce((acc, x) => (acc += x === '#' ? 1 : 0), 0);
}, 0);

console.log(count);
