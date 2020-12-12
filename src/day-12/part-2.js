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

const positionShip = {
  [actions.NORTH]: 0,
  [actions.SOUTH]: 0,
  [actions.EAST]: 0,
  [actions.WEST]: 0,
};

const positionWaypoint = {
  [actions.NORTH]: 1,
  [actions.SOUTH]: 0,
  [actions.EAST]: 10,
  [actions.WEST]: 0,
};

const turn = (degrees) => {
  const turns = ((degrees + 360) % 360) / 90;

  for (let i = 0; i < turns; i++) {
    const temp = positionWaypoint[actions.WEST];
    positionWaypoint[actions.WEST] = positionWaypoint[actions.SOUTH];
    positionWaypoint[actions.SOUTH] = positionWaypoint[actions.EAST];
    positionWaypoint[actions.EAST] = positionWaypoint[actions.NORTH];
    positionWaypoint[actions.NORTH] = temp;
  }
};

const calculate = (to, value) => {
  const opposite = opposites[to];

  if (positionWaypoint[opposite] > 0) {
    const temp = positionWaypoint[opposite];

    positionWaypoint[opposite] = Math.max(0, temp - value);
    positionWaypoint[to] = Math.max(0, value - temp);
  } else {
    positionWaypoint[to] += value;
  }
};

instructions.forEach(({ action, value }) => {
  if (action === actions.FORWARD) {
    positionShip[actions.NORTH] += positionWaypoint[actions.NORTH] * value;
    positionShip[actions.EAST] += positionWaypoint[actions.EAST] * value;
    positionShip[actions.SOUTH] += positionWaypoint[actions.SOUTH] * value;
    positionShip[actions.WEST] += positionWaypoint[actions.WEST] * value;
  } else if (action === actions.RIGHT) {
    turn(value);
  } else if (action === actions.LEFT) {
    turn(-value);
  } else {
    calculate(action, value);
  }
});

console.log(
  Math.abs(positionShip[actions.NORTH] - positionShip[actions.SOUTH]) +
    Math.abs(positionShip[actions.WEST] - positionShip[actions.EAST])
);
