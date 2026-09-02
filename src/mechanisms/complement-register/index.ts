export const COMPLEMENT_REGISTER_MECHANISM_ID = 'complement-register';

export interface ComplementRegisterState {
  mechanismId: typeof COMPLEMENT_REGISTER_MECHANISM_ID;
  width: number;
  modulus: number;
  physicalValue: number;
  additionReadout: number;
  subtractionReadout: number;
  encodedMinuend: number;
  incrementCount: number;
}

export interface ComplementSubtractAction {
  type: 'ADD_SUBTRAHEND_FORWARD';
  cycleId: string;
  subtrahend: number;
}

export interface ComplementIncrementEvent {
  mechanismId: typeof COMPLEMENT_REGISTER_MECHANISM_ID;
  cycleId: string;
  sequence: number;
  type: 'REGISTER_INCREMENTED';
  physicalBefore: number;
  physicalAfter: number;
  additionReadout: number;
  subtractionReadout: number;
  carriedAcross: number[];
}

export interface ComplementRegisterTrace {
  format: 'complement-register-trace';
  version: 1;
  mechanismId: typeof COMPLEMENT_REGISTER_MECHANISM_ID;
  cycleId: string;
  initialState: ComplementRegisterState;
  action: ComplementSubtractAction;
  events: ComplementIncrementEvent[];
  finalState: ComplementRegisterState;
}

export class InvalidComplementRegisterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidComplementRegisterError';
  }
}

const exactKeys = (value: object, expected: readonly string[], label: string): void => {
  if (Object.getPrototypeOf(value) !== Object.prototype) throw new InvalidComplementRegisterError(`${label} must be a plain object`);
  const keys = Object.keys(value);
  if (keys.length !== expected.length || keys.some(key => !expected.includes(key))) {
    throw new InvalidComplementRegisterError(`${label} contains unsupported fields`);
  }
  for (const key of expected) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (!descriptor || !descriptor.enumerable || !('value' in descriptor)) throw new InvalidComplementRegisterError(`${label} contains unsupported fields`);
  }
};

const widthModulus = (width: number): number => {
  if (!Number.isInteger(width) || width < 1 || width > 15) throw new InvalidComplementRegisterError('width must be an integer in 1..15');
  return 10 ** width;
};

const validValue = (value: number, modulus: number, label: string): void => {
  if (!Number.isSafeInteger(value) || value < 0 || value >= modulus) throw new InvalidComplementRegisterError(`${label} must fit the configured width`);
};

/** Mathematical fixed-width nines complement. This helper is M, not a historical procedure. */
export function ninesComplement(value: number, width: number): number {
  const modulus = widthModulus(width);
  validValue(value, modulus, 'value');
  return modulus - 1 - value;
}

export function createComplementRegister(minuend: number, width: number): ComplementRegisterState {
  const modulus = widthModulus(width);
  validValue(minuend, modulus, 'minuend');
  const physicalValue = ninesComplement(minuend, width);
  return {
    mechanismId: COMPLEMENT_REGISTER_MECHANISM_ID,
    width,
    modulus,
    physicalValue,
    additionReadout: physicalValue,
    subtractionReadout: minuend,
    encodedMinuend: minuend,
    incrementCount: 0,
  };
}

const normalizeState = (state: Readonly<ComplementRegisterState>): ComplementRegisterState => {
  if (!state || typeof state !== 'object' || Array.isArray(state)) throw new InvalidComplementRegisterError('state must be an object');
  exactKeys(state, ['mechanismId', 'width', 'modulus', 'physicalValue', 'additionReadout', 'subtractionReadout', 'encodedMinuend', 'incrementCount'], 'state');
  if (state.mechanismId !== COMPLEMENT_REGISTER_MECHANISM_ID) throw new InvalidComplementRegisterError('unsupported state mechanism');
  const modulus = widthModulus(state.width);
  if (state.modulus !== modulus) throw new InvalidComplementRegisterError('state modulus does not match width');
  validValue(state.physicalValue, modulus, 'physical value');
  validValue(state.encodedMinuend, modulus, 'encoded minuend');
  validValue(state.additionReadout, modulus, 'addition readout');
  validValue(state.subtractionReadout, modulus, 'subtraction readout');
  if (state.additionReadout !== state.physicalValue || state.subtractionReadout !== ninesComplement(state.physicalValue, state.width)) throw new InvalidComplementRegisterError('state readouts are inconsistent');
  if (!Number.isSafeInteger(state.incrementCount) || state.incrementCount < 0) throw new InvalidComplementRegisterError('increment count is invalid');
  return structuredClone(state);
};

const normalizeAction = (action: Readonly<ComplementSubtractAction>, state: ComplementRegisterState): ComplementSubtractAction => {
  if (!action || typeof action !== 'object' || Array.isArray(action)) throw new InvalidComplementRegisterError('action must be an object');
  exactKeys(action, ['type', 'cycleId', 'subtrahend'], 'action');
  if (action.type !== 'ADD_SUBTRAHEND_FORWARD' || typeof action.cycleId !== 'string' || action.cycleId.length === 0) throw new InvalidComplementRegisterError('unsupported complement action');
  if (!Number.isSafeInteger(action.subtrahend) || action.subtrahend < 0 || action.subtrahend > state.encodedMinuend) throw new InvalidComplementRegisterError('subtrahend must satisfy 0 <= B <= A');
  return { ...action };
};

const carryBoundaries = (before: number, width: number): number[] => {
  const carried: number[] = [];
  let value = before;
  for (let index = 0; index < width - 1 && value % 10 === 9; index += 1) {
    carried.push(index);
    value = Math.floor(value / 10);
  }
  return carried;
};

export function transitionComplementRegister(stateInput: Readonly<ComplementRegisterState>, actionInput: Readonly<ComplementSubtractAction>) {
  const state = normalizeState(stateInput);
  const action = normalizeAction(actionInput, state);
  const events: ComplementIncrementEvent[] = [];
  let physical = state.physicalValue;
  for (let sequence = 0; sequence < action.subtrahend; sequence += 1) {
    const before = physical;
    physical += 1;
    if (physical >= state.modulus) throw new InvalidComplementRegisterError('forward addition overflow is unsupported');
    events.push({
      mechanismId: COMPLEMENT_REGISTER_MECHANISM_ID,
      cycleId: action.cycleId,
      sequence,
      type: 'REGISTER_INCREMENTED',
      physicalBefore: before,
      physicalAfter: physical,
      additionReadout: physical,
      subtractionReadout: ninesComplement(physical, state.width),
      carriedAcross: carryBoundaries(before, state.width),
    });
  }
  return {
    state: {
      ...state,
      physicalValue: physical,
      additionReadout: physical,
      subtractionReadout: ninesComplement(physical, state.width),
      incrementCount: state.incrementCount + action.subtrahend,
    },
    events,
  };
}

export function reduceComplementRegisterEvent(stateInput: Readonly<ComplementRegisterState>, event: Readonly<ComplementIncrementEvent>): ComplementRegisterState {
  const state = normalizeState(stateInput);
  if (!event || typeof event !== 'object' || Array.isArray(event)) throw new InvalidComplementRegisterError('event must be an object');
  exactKeys(event, ['mechanismId', 'cycleId', 'sequence', 'type', 'physicalBefore', 'physicalAfter', 'additionReadout', 'subtractionReadout', 'carriedAcross'], 'event');
  if (event.mechanismId !== COMPLEMENT_REGISTER_MECHANISM_ID || event.type !== 'REGISTER_INCREMENTED' || event.physicalBefore !== state.physicalValue || event.physicalAfter !== event.physicalBefore + 1 || event.additionReadout !== event.physicalAfter || event.subtractionReadout !== ninesComplement(event.physicalAfter, state.width)) throw new InvalidComplementRegisterError('invalid complement increment event');
  if (!Array.isArray(event.carriedAcross) || Object.getPrototypeOf(event.carriedAcross) !== Array.prototype || event.carriedAcross.some((value, index) => value !== carryBoundaries(event.physicalBefore, state.width)[index]) || event.carriedAcross.length !== carryBoundaries(event.physicalBefore, state.width).length) throw new InvalidComplementRegisterError('invalid carry boundary list');
  return { ...state, physicalValue: event.physicalAfter, additionReadout: event.additionReadout, subtractionReadout: event.subtractionReadout, incrementCount: state.incrementCount + 1 };
}

export function traceComplementSubtraction(minuend: number, subtrahend: number, width: number): ComplementRegisterTrace {
  const initialState = createComplementRegister(minuend, width);
  const action: ComplementSubtractAction = { type: 'ADD_SUBTRAHEND_FORWARD', cycleId: `complement-${minuend}-${subtrahend}-${width}`, subtrahend };
  const result = transitionComplementRegister(initialState, action);
  return { format: 'complement-register-trace', version: 1, mechanismId: COMPLEMENT_REGISTER_MECHANISM_ID, cycleId: action.cycleId, initialState, action, events: result.events, finalState: result.state };
}

export function replayComplementSubtraction(trace: Readonly<ComplementRegisterTrace>): ComplementRegisterState {
  if (!trace || typeof trace !== 'object' || Array.isArray(trace)) throw new InvalidComplementRegisterError('trace must be an object');
  exactKeys(trace, ['format', 'version', 'mechanismId', 'cycleId', 'initialState', 'action', 'events', 'finalState'], 'trace');
  if (trace.format !== 'complement-register-trace' || trace.version !== 1 || trace.mechanismId !== COMPLEMENT_REGISTER_MECHANISM_ID || trace.cycleId !== trace.action.cycleId || !Array.isArray(trace.events) || Object.getPrototypeOf(trace.events) !== Array.prototype) throw new InvalidComplementRegisterError('unsupported trace envelope');
  const expected = transitionComplementRegister(trace.initialState, trace.action);
  if (JSON.stringify(expected.events) !== JSON.stringify(trace.events) || JSON.stringify(expected.state) !== JSON.stringify(trace.finalState)) throw new InvalidComplementRegisterError('trace is not action-derived');
  const replayed = trace.events.reduce(reduceComplementRegisterEvent, trace.initialState);
  if (JSON.stringify(replayed) !== JSON.stringify(trace.finalState)) throw new InvalidComplementRegisterError('trace replay mismatch');
  return replayed;
}
