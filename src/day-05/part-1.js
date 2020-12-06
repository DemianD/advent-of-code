import { read } from '../utils.js';

const constants = {
  FRONT: 'F',
  BACK: 'B',
  LEFT: 'L',
  RIGHT: 'R',
};

export const calculateSeatID = (seat) => {
  let minRow = 0;
  let maxRow = 127;

  for (let i = 0; i < 7; i++) {
    if (seat[i] === constants.FRONT) {
      maxRow = minRow + Math.floor((maxRow - minRow) / 2);
    }
    if (seat[i] === constants.BACK) {
      minRow = minRow + Math.ceil((maxRow - minRow) / 2);
    }
  }

  let minColumn = 0;
  let maxColumn = 7;

  for (let i = 7; i < 10; i++) {
    if (seat[i] === constants.LEFT) {
      maxColumn = minColumn + Math.floor((maxColumn - minColumn) / 2);
    }
    if (seat[i] === constants.RIGHT) {
      minColumn = minColumn + Math.ceil((maxColumn - minColumn) / 2);
    }
  }

  return maxRow * 8 + maxColumn;
};

export const calculateSeatIDs = async () => {
  const seats = (await read('./day-05/data/input.txt')).trim().split('\n');

  return seats.map(calculateSeatID).sort((a, b) => a - b);
};

// const seatIDs = await calculateSeatIDs();
// console.log(seatIDs[seatIDs.length - 1]);
