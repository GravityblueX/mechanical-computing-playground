export const COMPLEMENT_REGISTER_MECHANISM_ID = 'complement-register';

export interface ComplementRegisterState {
  mechanismId: typeof COMPLEMENT_REGISTER_MECHANISM_ID;
  width: number;
  modulus: number;
  physicalValue: number;
  additionReadout: number;
  subtractionReadout: number;
  encodedMinuend: number;
  actionCount: number;
}

export interface ComplementSubtractAction {
  type: 'ADD_SUBTRAHEND_FORWARD';
  cycleId: string;
  subtrahend: number;
}

interface ComplementEventBase {
  mechanismId: typeof COMPLEMENT_REGISTER_MECHANISM_ID;
  cycleId: string;
  sequence: number;
}

export interface ForwardAddBeginEvent extends ComplementEventBase {
  type: 'FORWARD_ADD_BEGIN';
  physicalBefore: number;
  delta: number;
}

export interface CarryBoundarySummaryEvent extends ComplementEventBase {
  type: 'CARRY_BOUNDARY_SUMMARY';
  order: number;
  boundary: number;
  crossingCount: number;
}

export interface RegisterAdvancedEvent extends ComplementEventBase {
  type: 'REGISTER_ADVANCED';
  physicalBefore: number;
  delta: number;
  physicalAfter: number;
  additionReadout: number;
  subtractionReadout: number;
}

export interface ForwardAddEndEvent extends ComplementEventBase {
  type: 'FORWARD_ADD_END';
  physicalAfter: number;
  subtractionReadout: number;
}

export type ComplementRegisterEvent =
  | ForwardAddBeginEvent
  | CarryBoundarySummaryEvent
  | RegisterAdvancedEvent
  | ForwardAddEndEvent;

export interface ComplementRegisterTrace {
  format: 'complement-register-trace';
  version: 2;
  mechanismId: typeof COMPLEMENT_REGISTER_MECHANISM_ID;
  cycleId: string;
  initialState: ComplementRegisterState;
  action: ComplementSubtractAction;
  events: ComplementRegisterEvent[];
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
  const keys = Reflect.ownKeys(value).filter(key => Object.prototype.propertyIsEnumerable.call(value, key));
  if (keys.length !== expected.length || keys.some(key => typeof key !== 'string' || !expected.includes(key))) {
    throw new InvalidComplementRegisterError(`${label} contains unsupported fields`);
  }
  for (const key of expected) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (!descriptor || !descriptor.enumerable || !('value' in descriptor)) throw new InvalidComplementRegisterError(`${label} contains unsupported fields`);
  }
};

const exactArray = (value: unknown, label: string): unknown[] => {
  if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype) throw new InvalidComplementRegisterError(`${label} must be an array`);
  const keys = Reflect.ownKeys(value).filter(key => Object.prototype.propertyIsEnumerable.call(value, key));
  if (keys.length !== value.length) throw new InvalidComplementRegisterError(`${label} contains sparse or unsupported fields`);
  for (let index = 0; index < value.length; index += 1) {
    const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
    if (!descriptor || !descriptor.enumerable || !('value' in descriptor)) throw new InvalidComplementRegisterError(`${label} contains sparse or unsupported fields`);
  }
  return value;
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
    actionCount: 0,
  };
}

const normalizeState = (state: Readonly<ComplementRegisterState>): ComplementRegisterState => {
  if (!state || typeof state !== 'object' || Array.isArray(state)) throw new InvalidComplementRegisterError('state must be an object');
  exactKeys(state, ['mechanismId', 'width', 'modulus', 'physicalValue', 'additionReadout', 'subtractionReadout', 'encodedMinuend', 'actionCount'], 'state');
  if (state.mechanismId !== COMPLEMENT_REGISTER_MECHANISM_ID) throw new InvalidComplementRegisterError('unsupported state mechanism');
  const modulus = widthModulus(state.width);
  if (state.modulus !== modulus) throw new InvalidComplementRegisterError('state modulus does not match width');
  validValue(state.physicalValue, modulus, 'physical value');
  validValue(state.encodedMinuend, modulus, 'encoded minuend');
  validValue(state.additionReadout, modulus, 'addition readout');
  validValue(state.subtractionReadout, modulus, 'subtraction readout');
  if (state.additionReadout !== state.physicalValue || state.subtractionReadout !== ninesComplement(state.physicalValue, state.width)) throw new InvalidComplementRegisterError('state readouts are inconsistent');
  if (!Number.isSafeInteger(state.actionCount) || state.actionCount < 0) throw new InvalidComplementRegisterError('action count is invalid');
  return structuredClone(state);
};

const normalizeAction = (action: Readonly<ComplementSubtractAction>, state: ComplementRegisterState): ComplementSubtractAction => {
  if (!action || typeof action !== 'object' || Array.isArray(action)) throw new InvalidComplementRegisterError('action must be an object');
  exactKeys(action, ['type', 'cycleId', 'subtrahend'], 'action');
  if (action.type !== 'ADD_SUBTRAHEND_FORWARD' || typeof action.cycleId !== 'string' || action.cycleId.length === 0) throw new InvalidComplementRegisterError('unsupported complement action');
  if (!Number.isSafeInteger(action.subtrahend) || action.subtrahend < 0 || action.subtrahend > state.encodedMinuend) throw new InvalidComplementRegisterError('subtrahend must satisfy 0 <= B <= A');
  return { ...action };
};

/** M/P inspection summary: crossings of each decimal boundary, computed in O(width). */
export function carryBoundarySummaries(before: number, delta: number, width: number) {
  const modulus = widthModulus(width);
  validValue(before, modulus, 'physical value');
  if (!Number.isSafeInteger(delta) || delta < 0 || before + delta >= modulus) throw new InvalidComplementRegisterError('forward delta must not wrap the configured width');
  return Array.from({ length: Math.max(0, width - 1) }, (_, order) => {
    const boundary = 10 ** (order + 1);
    return {
      order,
      boundary,
      crossingCount: Math.floor((before + delta) / boundary) - Math.floor(before / boundary),
    };
  });
}

const eventKeys: Record<ComplementRegisterEvent['type'], readonly string[]> = {
  FORWARD_ADD_BEGIN: ['mechanismId', 'cycleId', 'sequence', 'type', 'physicalBefore', 'delta'],
  CARRY_BOUNDARY_SUMMARY: ['mechanismId', 'cycleId', 'sequence', 'type', 'order', 'boundary', 'crossingCount'],
  REGISTER_ADVANCED: ['mechanismId', 'cycleId', 'sequence', 'type', 'physicalBefore', 'delta', 'physicalAfter', 'additionReadout', 'subtractionReadout'],
  FORWARD_ADD_END: ['mechanismId', 'cycleId', 'sequence', 'type', 'physicalAfter', 'subtractionReadout'],
};

export function transitionComplementRegister(stateInput: Readonly<ComplementRegisterState>, actionInput: Readonly<ComplementSubtractAction>) {
  const state = normalizeState(stateInput);
  const action = normalizeAction(actionInput, state);
  const physicalAfter = state.physicalValue + action.subtrahend;
  const subtractionReadout = ninesComplement(physicalAfter, state.width);
  let sequence = 0;
  const base = (): ComplementEventBase => ({ mechanismId: COMPLEMENT_REGISTER_MECHANISM_ID, cycleId: action.cycleId, sequence: sequence++ });
  const events: ComplementRegisterEvent[] = [
    { ...base(), type: 'FORWARD_ADD_BEGIN', physicalBefore: state.physicalValue, delta: action.subtrahend },
    ...carryBoundarySummaries(state.physicalValue, action.subtrahend, state.width).map(summary => ({ ...base(), type: 'CARRY_BOUNDARY_SUMMARY' as const, ...summary })),
    { ...base(), type: 'REGISTER_ADVANCED', physicalBefore: state.physicalValue, delta: action.subtrahend, physicalAfter, additionReadout: physicalAfter, subtractionReadout },
    { ...base(), type: 'FORWARD_ADD_END', physicalAfter, subtractionReadout },
  ];
  return {
    state: { ...state, physicalValue: physicalAfter, additionReadout: physicalAfter, subtractionReadout, actionCount: state.actionCount + 1 },
    events,
  };
}

export function reduceComplementRegisterEvent(stateInput: Readonly<ComplementRegisterState>, event: Readonly<ComplementRegisterEvent>): ComplementRegisterState {
  const state = normalizeState(stateInput);
  if (!event || typeof event !== 'object' || Array.isArray(event)) throw new InvalidComplementRegisterError('event must be an object');
  if (typeof event.type !== 'string' || !(event.type in eventKeys)) throw new InvalidComplementRegisterError('unsupported complement event');
  exactKeys(event, eventKeys[event.type as ComplementRegisterEvent['type']], 'event');
  if (event.mechanismId !== COMPLEMENT_REGISTER_MECHANISM_ID || typeof event.cycleId !== 'string' || event.cycleId.length === 0 || !Number.isSafeInteger(event.sequence) || event.sequence < 0) throw new InvalidComplementRegisterError('invalid complement event envelope');
  if (event.type === 'REGISTER_ADVANCED') {
    const after = event.physicalBefore + event.delta;
    if (event.physicalBefore !== state.physicalValue || !Number.isSafeInteger(event.delta) || event.delta < 0 || event.physicalAfter !== after || event.additionReadout !== after || event.subtractionReadout !== ninesComplement(after, state.width)) throw new InvalidComplementRegisterError('invalid register-advanced event');
    return { ...state, physicalValue: after, additionReadout: after, subtractionReadout: event.subtractionReadout, actionCount: state.actionCount + 1 };
  }
  return state;
}

export function traceComplementSubtraction(minuend: number, subtrahend: number, width: number): ComplementRegisterTrace {
  const initialState = createComplementRegister(minuend, width);
  const action: ComplementSubtractAction = { type: 'ADD_SUBTRAHEND_FORWARD', cycleId: `complement-${minuend}-${subtrahend}-${width}`, subtrahend };
  const result = transitionComplementRegister(initialState, action);
  return { format: 'complement-register-trace', version: 2, mechanismId: COMPLEMENT_REGISTER_MECHANISM_ID, cycleId: action.cycleId, initialState, action, events: result.events, finalState: result.state };
}

export function replayComplementSubtraction(trace: Readonly<ComplementRegisterTrace>): ComplementRegisterState {
  if (!trace || typeof trace !== 'object' || Array.isArray(trace)) throw new InvalidComplementRegisterError('trace must be an object');
  exactKeys(trace, ['format', 'version', 'mechanismId', 'cycleId', 'initialState', 'action', 'events', 'finalState'], 'trace');
  if (trace.format !== 'complement-register-trace' || trace.version !== 2 || trace.mechanismId !== COMPLEMENT_REGISTER_MECHANISM_ID || trace.cycleId !== trace.action.cycleId) throw new InvalidComplementRegisterError('unsupported trace envelope');
  const events = exactArray(trace.events, 'events') as ComplementRegisterEvent[];
  const expected = transitionComplementRegister(trace.initialState, trace.action);
  if (JSON.stringify(expected.events) !== JSON.stringify(events) || JSON.stringify(expected.state) !== JSON.stringify(trace.finalState)) throw new InvalidComplementRegisterError('trace is not action-derived');
  let replayed = normalizeState(trace.initialState);
  events.forEach((event, sequence) => {
    if (event.sequence !== sequence || event.cycleId !== trace.cycleId) throw new InvalidComplementRegisterError('invalid event order');
    replayed = reduceComplementRegisterEvent(replayed, event);
  });
  if (JSON.stringify(replayed) !== JSON.stringify(trace.finalState)) throw new InvalidComplementRegisterError('trace replay mismatch');
  return replayed;
}
