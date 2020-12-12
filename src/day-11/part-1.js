import { read } from '../utils.js';

let lines = (await read('./day-11/data/input.txt'))
  .trim()
  .split('\n')
  .map((x) => x.split(''));

const numberOfRows = lines.length;
const numberOfColumns = lines[0].length;

const occupiedAdjacentSeats = (lines, i, j, borderAsEmpty, find) => {
  const positions = [
    [i - 1, j - 1],
    [i - 1, j],
    [i - 1, j + 1],
    [i, j - 1],
    [i, j + 1],
    [i + 1, j - 1],
    [i + 1, j],
    [i + 1, j + 1],
  ];

  return positions.filter(([adjacentI, adjacentJ]) => {
    if (
      adjacentI < 0 ||
      adjacentI >= numberOfRows ||
      adjacentJ < 0 ||
      adjacentJ >= numberOfColumns
    ) {
      return borderAsEmpty;
    }

    return find.includes(lines[adjacentI][adjacentJ]);
  }).length;
};

let changed = true;
let tempLines;

while (changed) {
  changed = false;
  tempLines = JSON.parse(JSON.stringify(lines));

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === 'L' && occupiedAdjacentSeats(lines, i, j, true, ['.', 'L']) === 8) {
        tempLines[i][j] = '#';
        changed = true;
      } else if (lines[i][j] === '#' && occupiedAdjacentSeats(lines, i, j, false, ['#']) >= 4) {
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
