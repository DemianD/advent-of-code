import { calculateSeatIDs } from './part-1.js';

const findSeat = async () => {
  const seatIDs = await calculateSeatIDs();

  for (let i = 1; i < seatIDs.length; i++) {
    if (seatIDs[i] + 1 !== seatIDs[i + 1]) {
      return seatIDs[i] + 1;
    }
  }
};

console.log(await findSeat());
