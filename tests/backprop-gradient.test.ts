import { describe, expect, it } from 'vitest';
import { evaluate as evaluateA } from '../src/backprop/core/stage-a';
import { evaluate as evaluateB } from '../src/backprop/core/stage-b';

function finiteDifference(input: Record<string, number>, key: string, evaluate: (value: Record<string, number>) => number): number {
  const epsilon = 1e-6;
  const plus = { ...input, [key]: input[key] + epsilon };
  const minus = { ...input, [key]: input[key] - epsilon };
  return (evaluate(plus) - evaluate(minus)) / (2 * epsilon);
}

describe('backprop numerical references', () => {
  it('Stage A analytic gradients match finite differences', () => {
    const input = { x1: 1.5, x2: -2, w1: 0.7, w2: -0.4, target: 2, learningRate: 0.1 };
    const state = evaluateA(input);
    const loss = (v: Record<string, number>) => evaluateA({ ...input, w1: v.w1, w2: v.w2 }).loss;
    expect(state.gradients.w1).toBeCloseTo(finiteDifference(input, 'w1', loss), 5);
    expect(state.gradients.w2).toBeCloseTo(finiteDifference(input, 'w2', loss), 5);
  });

  it('Stage B exposes chain-rule gradients for all weights', () => {
    const input = { x1: 1, x2: 2, w11: 1, w12: 0.5, w21: 0.25, w22: 1, v1: 1, v2: -0.5, target: 3, learningRate: 0.01 };
    const state = evaluateB(input);
    const keys = ['w11', 'w12', 'w21', 'w22', 'v1', 'v2'] as const;
    const loss = (v: Record<string, number>) => evaluateB({ ...input, ...Object.fromEntries(keys.map((key) => [key, v[key]])) }).loss;
    for (const key of keys) expect(state.gradients[key]).toBeCloseTo(finiteDifference(input, key, loss), 5);
    expect(state.gradients.dLdy).toBe(state.output - input.target);
  });

  it('Stage B update lowers loss for a stable rate', () => {
    let state = evaluateB({ x1: 1, x2: 2, w11: 0.5, w12: 0.1, w21: 0.2, w22: 0.4, v1: 0.6, v2: 0.7, target: 3, learningRate: 0.01 });
    const start = state.loss;
    for (let i = 0; i < 5; i += 1) {
      const g = state.gradients;
      state = evaluateB({ ...state, v1: state.v1 - state.learningRate * g.v1, v2: state.v2 - state.learningRate * g.v2, w11: state.w11 - state.learningRate * g.w11, w12: state.w12 - state.learningRate * g.w12, w21: state.w21 - state.learningRate * g.w21, w22: state.w22 - state.learningRate * g.w22 });
    }
    expect(state.loss).toBeLessThan(start);
  });
});
