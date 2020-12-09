import { countQuestionsPerGroup } from './part-2.js';

describe('day-06 part-1', () => {
  it('should calculate the number of questions correctly', () => {
    expect(countQuestionsPerGroup(`abc`)).toBe(3);
    expect(
      countQuestionsPerGroup(`a
    b
    c`)
    ).toBe(0);
    expect(
      countQuestionsPerGroup(`ab
    ac`)
    ).toBe(1);
    expect(
      countQuestionsPerGroup(`a
    a
    a
    a`)
    ).toBe(1);
    expect(countQuestionsPerGroup(`b`)).toBe(1);
  });
});
