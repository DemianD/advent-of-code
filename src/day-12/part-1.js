import { read } from '../utils.js';

let instructions = (await read('./day-12/data/input.txt'))
  .trim()
  .split('\n')
  .map((x) => {
    const [_, action, value] = x.split(/^([A-Z])(\d+)$/);
    return { action, value: Number(value) };
  });

const actions = {
  NORTH: 'N',
  SOUTH: 'S',
  EAST: 'E',
  WEST: 'W',
  LEFT: 'L',
  RIGHT: 'R',
  FORWARD: 'F',
};

const opposites = {
  [actions.NORTH]: actions.SOUTH,
  [actions.SOUTH]: actions.NORTH,
  [actions.EAST]: actions.WEST,
  [actions.WEST]: actions.EAST,
};

const position = {
  face: actions.EAST,
  [actions.NORTH]: 0,
  [actions.SOUTH]: 0,
  [actions.EAST]: 0,
  [actions.WEST]: 0,
};

// There is probably a smarter way to do this.
const turn = (face, degrees) => {
  const directionToDegrees = {
    [actions.EAST]: 0,
    [actions.SOUTH]: 90,
    [actions.WEST]: 180,
    [actions.NORTH]: 270,
  };

  const degreesToDirection = {
    0: actions.EAST,
    90: actions.SOUTH,
    180: actions.WEST,
    270: actions.NORTH,
  };

  const newDegrees = (((directionToDegrees[face] + degrees) % 360) + 360) % 360;
  return degreesToDirection[newDegrees];
};

const calculate = (to, value) => {
  const opposite = opposites[to];

  if (position[opposite] > 0) {
    const temp = position[opposite];

    position[opposite] = Math.max(0, temp - value);
    position[to] = Math.max(0, value - temp);
  } else {
    position[to] += value;
  }
};

instructions.forEach(({ action, value }) => {
  if (action === actions.FORWARD) {
    calculate(position.face, value);
  } else if (action === actions.RIGHT) {
    position.face = turn(position.face, value);
  } else if (action === actions.LEFT) {
    position.face = turn(position.face, -value);
  } else {
    calculate(action, value);
  }
});

console.log(
  position[actions.NORTH] +
    position[actions.WEST] +
    position[actions.EAST] +
    position[actions.SOUTH]
);
