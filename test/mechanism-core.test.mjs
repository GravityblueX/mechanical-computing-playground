import assert from 'node:assert/strict';
import { crankPlusOne, digitsToString, incrementWheel, InvalidWheelStateError, replay } from '../src/mechanism-core.mjs';

const run = (name, fn) => {
  try { fn(); console.log(`ok - ${name}`); }
  catch (error) { console.error(`not ok - ${name}`); throw error; }
};

run('ordinary increment has no carry', () => {
  const result = crankPlusOne([4, 3, 2, 1]);
  assert.deepEqual(result.after, [5, 3, 2, 1]);
  assert.equal(result.phases.filter((phase) => phase.event).length, 0);
  assert.equal(result.phases.at(-1).phase, 'CRANK_COMPLETE');
});

run('single carry propagates from units to tens', () => {
  const result = crankPlusOne([9, 0, 0, 0], 4);
  assert.equal(digitsToString(result.after), '0010');
  assert.deepEqual(result.phases.filter((phase) => phase.event).map((phase) => phase.event.type), ['CARRY_PENDING', 'CARRY_PROPAGATED']);
  assert.equal(result.phases[1].event.crank, 4);
});

run('chained carry reaches the first non-nine wheel', () => {
  const result = crankPlusOne([9, 9, 0, 0]);
  assert.equal(digitsToString(result.after), '0100');
  assert.deepEqual(result.phases.filter((phase) => phase.event).map((phase) => [phase.event.type, phase.event.fromIndex, phase.event.toIndex]), [
    ['CARRY_PENDING', 0, 1], ['CARRY_PROPAGATED', 0, 1],
    ['CARRY_PENDING', 1, 2], ['CARRY_PROPAGATED', 1, 2],
  ]);
});

run('all-nine state emits carry-out and rolls over', () => {
  const result = crankPlusOne([9, 9, 9, 9]);
  assert.deepEqual(result.after, [0, 0, 0, 0]);
  assert.equal(result.phases.at(-2).phase, 'CARRY_OUT');
  assert.equal(result.phases.at(-2).event.fromIndex, 3);
});

run('invalid states are rejected', () => {
  for (const value of [[], [10], [-1], [1.5], [Number.NaN]]) {
    assert.throws(() => crankPlusOne(value), InvalidWheelStateError);
  }
  assert.throws(() => incrementWheel(10), InvalidWheelStateError);
});

run('phase sequence is deterministic and replayable', () => {
  const first = crankPlusOne([9, 9, 8]);
  const second = crankPlusOne([9, 9, 8]);
  assert.deepEqual(first, second);
  assert.deepEqual(replay(first), first.after);
});
