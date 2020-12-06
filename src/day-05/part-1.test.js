import { calculateSeatID } from './part-1.js';

describe('day-05 part-1', () => {
  it('should calculate the correct seat id for the given examples', () => {
    expect(calculateSeatID('FBFBBFFRLR')).toBe(357);
    expect(calculateSeatID('BFFFBBFRRR')).toBe(567);
    expect(calculateSeatID('FFFBBBFRRR')).toBe(119);
    expect(calculateSeatID('BBFFBBFRLL')).toBe(820);
  });
});
