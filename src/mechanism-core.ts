import type { MechanismEvent } from './core/events';
import type { TransitionResult } from './core/transition';
import type { OperationTrace } from './core/trace';
import type { OperationCycleId, WheelIdentity } from './core/types';

export const DECIMAL_REGISTER_MECHANISM_ID = 'decimal-register';

export interface DecimalRegisterState {
  mechanismId: typeof DECIMAL_REGISTER_MECHANISM_ID;
  /** Least-significant wheel first. */
  digits: number[];
}

export interface CrankAction {
  type: 'CRANK_PLUS_ONE';
  cycleId: OperationCycleId;
}

export class InvalidWheelStateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidWheelStateError';
  }
}

function assertDigits(digits: readonly number[]): void {
  if (!Array.isArray(digits) || digits.length === 0) {
    throw new InvalidWheelStateError('wheel state must be a non-empty array');
  }
  digits.forEach((digit, index) => {
    if (!Number.isInteger(digit) || digit < 0 || digit > 9) {
      throw new InvalidWheelStateError(`wheel ${index} must be an integer in 0..9`);
    }
  });
}

function wheel(index: number): WheelIdentity {
  return { kind: 'wheel', id: `decimal-wheel-${index}`, index };
}

export function createDecimalRegister(digits: readonly number[]): DecimalRegisterState {
  assertDigits(digits);
  return { mechanismId: DECIMAL_REGISTER_MECHANISM_ID, digits: [...digits] };
}

/** Increment one validated decimal wheel. */
export function incrementWheel(position: number): { position: number; carry: boolean } {
  if (!Number.isInteger(position) || position < 0 || position > 9) {
    throw new InvalidWheelStateError('wheel position must be an integer in 0..9');
  }
  return position === 9
    ? { position: 0, carry: true }
    : { position: position + 1, carry: false };
}

/** Pure deterministic state + action transition for one forward crank. */
export function transitionDecimalRegister(
  state: Readonly<DecimalRegisterState>,
  action: Readonly<CrankAction>,
): TransitionResult<DecimalRegisterState> {
  assertDigits(state.digits);
  if (state.mechanismId !== DECIMAL_REGISTER_MECHANISM_ID || action.type !== 'CRANK_PLUS_ONE') {
    throw new InvalidWheelStateError('unsupported decimal register state or action');
  }

  const digits = [...state.digits];
  const events: MechanismEvent[] = [];
  let sequence = 0;
  const base = () => ({
    mechanismId: state.mechanismId,
    cycleId: action.cycleId,
    sequence: sequence++,
  });

  events.push({
    ...base(),
    type: 'CRANK_BEGIN',
    phase: 'CRANK_BEGIN',
    operation: { type: 'TURN_CRANK', motion: { kind: 'rotation', turns: 1 } },
  });

  let index = 0;
  let overflowWheel: WheelIdentity | undefined;
  while (index < digits.length) {
    const from = digits[index];
    const result = incrementWheel(from);
    digits[index] = result.position;
    events.push({
      ...base(),
      type: 'WHEEL_STEP',
      phase: 'WHEEL_STEP',
      wheel: wheel(index),
      motion: { kind: 'step', amount: 1 },
      from,
      to: result.position,
    });
    if (!result.carry) break;

    const nextIndex = index + 1;
    if (nextIndex >= digits.length) {
      overflowWheel = wheel(index);
      events.push({ ...base(), type: 'CARRY_OUT', phase: 'CARRY_OUT', fromWheel: overflowWheel });
      break;
    }

    const fromWheel = wheel(index);
    const toWheel = wheel(nextIndex);
    events.push({ ...base(), type: 'CARRY_PENDING', phase: 'CARRY_PENDING', fromWheel, toWheel });
    events.push({ ...base(), type: 'CARRY_PROPAGATED', phase: 'CARRY_PROPAGATED', fromWheel, toWheel });
    index = nextIndex;
  }

  events.push({ ...base(), type: 'CRANK_END', phase: 'CRANK_END' });
  const warnings = overflowWheel
    ? [{ severity: 'warning' as const, code: 'OVERFLOW' as const, message: 'carry exceeded register width', wheel: overflowWheel }]
    : [];
  return {
    state: { mechanismId: DECIMAL_REGISTER_MECHANISM_ID, digits },
    events,
    warnings,
    errors: [],
  };
}

/** Event reducer used by trace replay; no transition code is re-executed. */
export function reduceDecimalRegisterEvent(
  state: Readonly<DecimalRegisterState>,
  event: Readonly<MechanismEvent>,
): DecimalRegisterState {
  if (event.mechanismId !== state.mechanismId) throw new Error('event mechanism does not match state');
  const digits = [...state.digits];
  if (event.type === 'WHEEL_STEP') {
    if (digits[event.wheel.index] !== event.from) throw new Error(`wheel ${event.wheel.index} trace precondition failed`);
    digits[event.wheel.index] = event.to;
  }
  return { mechanismId: state.mechanismId, digits };
}

export function createCrankTrace(
  digits: readonly number[],
  crank = 0,
): OperationTrace<DecimalRegisterState, CrankAction> {
  if (!Number.isInteger(crank) || crank < 0) throw new InvalidWheelStateError('crank must be a non-negative integer');
  const initialState = createDecimalRegister(digits);
  const action: CrankAction = { type: 'CRANK_PLUS_ONE', cycleId: `crank-${crank}` };
  const result = transitionDecimalRegister(initialState, action);
  return {
    format: 'mechanical-computing-trace',
    version: 1,
    mechanismId: initialState.mechanismId,
    cycleId: action.cycleId,
    initialState,
    action,
    events: [...result.events],
    warnings: [...result.warnings],
    errors: [...result.errors],
    finalState: result.state,
  };
}

// Compatibility view for the original M0 callers. It delegates to the shared transition.
export function crankPlusOne(digits: readonly number[], crank = 0) {
  const trace = createCrankTrace(digits, crank);
  return {
    before: [...trace.initialState.digits],
    after: [...trace.finalState.digits],
    crank,
    phases: trace.events.map((event) => ({ phase: event.phase, event })),
  };
}

export function digitsToString(digits: readonly number[]): string {
  assertDigits(digits);
  return [...digits].reverse().join('');
}

export function replay(result: ReturnType<typeof crankPlusOne>): number[] {
  const state = createDecimalRegister(result.before);
  return result.phases.reduce<DecimalRegisterState>(
    (current, phase) => reduceDecimalRegisterEvent(current, phase.event),
    state,
  ).digits;
}
