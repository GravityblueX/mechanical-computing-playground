export const SETTING_CRANK_INTERLOCK_ID = 'setting-crank-interlock';

export type InterlockPhase =
  | 'HOME_FREE'
  | 'BEGIN_SETTING_LOCKED'
  | 'BEGIN_CRANK_RELEASED'
  | 'ACTIVE'
  | 'RETURNING'
  | 'RETURNED_HOME'
  | 'RETURN_CRANK_LOCKED';

export interface SettingCrankInterlockState {
  mechanismId: typeof SETTING_CRANK_INTERLOCK_ID;
  settingValue: number;
  settingRevision: number;
  crankPosition: 'HOME' | 'ACTIVE';
  crankLocked: boolean;
  settingLocked: boolean;
  phase: InterlockPhase;
  completedCycleCount: number;
  humanOperationCount: number;
}

export type InterlockAction =
  | { type: 'CHANGE_SETTING'; cycleId: string; value: number }
  | { type: 'BEGIN_CRANK_CYCLE'; cycleId: string }
  | { type: 'COMPLETE_CRANK_CYCLE'; cycleId: string };

interface EventBase {
  mechanismId: typeof SETTING_CRANK_INTERLOCK_ID;
  cycleId: string;
  sequence: number;
}

export type InterlockEvent =
  | (EventBase & { type: 'SETTING_CHANGED'; valueBefore: number; valueAfter: number; revisionBefore: number; revisionAfter: number; humanBefore: number; humanAfter: number })
  | (EventBase & { type: 'SETTING_LOCKED'; settingLockedBefore: false; settingLockedAfter: true })
  | (EventBase & { type: 'CRANK_RELEASED'; crankLockedBefore: true; crankLockedAfter: false })
  | (EventBase & { type: 'CRANK_CYCLE_BEGUN'; positionBefore: 'HOME'; positionAfter: 'ACTIVE'; humanBefore: number; humanAfter: number })
  | (EventBase & { type: 'CRANK_CYCLE_COMPLETED'; cycleCountBefore: number; cycleCountAfter: number; humanBefore: number; humanAfter: number })
  | (EventBase & { type: 'CRANK_RETURNED_HOME'; positionBefore: 'ACTIVE'; positionAfter: 'HOME' })
  | (EventBase & { type: 'CRANK_LOCKED'; crankLockedBefore: false; crankLockedAfter: true })
  | (EventBase & { type: 'SETTING_RELEASED'; settingLockedBefore: true; settingLockedAfter: false });

export interface InterlockTrace {
  initialState: SettingCrankInterlockState;
  actions: InterlockAction[];
  events: InterlockEvent[];
  finalState: SettingCrankInterlockState;
}

export class InvalidInterlockStateError extends Error {
  constructor(message: string) { super(message); this.name = 'InvalidInterlockStateError'; }
}

function nonNegative(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value < 0) throw new InvalidInterlockStateError(`${name} must be a non-negative safe integer`);
}

function increment(value: number, name: string): number {
  nonNegative(value, name);
  if (value === Number.MAX_SAFE_INTEGER) throw new InvalidInterlockStateError(`${name} exceeds safe integer range`);
  return value + 1;
}

export function assertInterlockInvariant(state: Readonly<SettingCrankInterlockState>): void {
  if (state.mechanismId !== SETTING_CRANK_INTERLOCK_ID) throw new InvalidInterlockStateError('mechanism id mismatch');
  nonNegative(state.settingValue, 'setting value');
  nonNegative(state.settingRevision, 'setting revision');
  nonNegative(state.completedCycleCount, 'completed cycle count');
  nonNegative(state.humanOperationCount, 'human operation count');
  const expected: Record<InterlockPhase, readonly [SettingCrankInterlockState['crankPosition'], boolean, boolean]> = {
    HOME_FREE: ['HOME', true, false],
    BEGIN_SETTING_LOCKED: ['HOME', true, true],
    BEGIN_CRANK_RELEASED: ['HOME', false, true],
    ACTIVE: ['ACTIVE', false, true],
    RETURNING: ['ACTIVE', false, true],
    RETURNED_HOME: ['HOME', false, true],
    RETURN_CRANK_LOCKED: ['HOME', true, true],
  };
  const [position, crankLocked, settingLocked] = expected[state.phase];
  if (state.crankPosition !== position || state.crankLocked !== crankLocked || state.settingLocked !== settingLocked) {
    throw new InvalidInterlockStateError(`lock/position invariant failed for ${state.phase}`);
  }
}

export function createSettingCrankInterlock(settingValue = 0): SettingCrankInterlockState {
  nonNegative(settingValue, 'setting value');
  return {
    mechanismId: SETTING_CRANK_INTERLOCK_ID,
    settingValue,
    settingRevision: 0,
    crankPosition: 'HOME',
    crankLocked: true,
    settingLocked: false,
    phase: 'HOME_FREE',
    completedCycleCount: 0,
    humanOperationCount: 0,
  };
}

export function transitionInterlock(
  state: Readonly<SettingCrankInterlockState>,
  action: Readonly<InterlockAction>,
): { state: SettingCrankInterlockState; events: InterlockEvent[] } {
  assertInterlockInvariant(state);
  if (!action.cycleId) throw new InvalidInterlockStateError('cycle id is required');
  const base = (sequence: number): EventBase => ({ mechanismId: SETTING_CRANK_INTERLOCK_ID, cycleId: action.cycleId, sequence });
  let events: InterlockEvent[];
  if (action.type === 'CHANGE_SETTING') {
    nonNegative(action.value, 'setting value');
    if (state.phase !== 'HOME_FREE' || state.settingLocked) throw new InvalidInterlockStateError('setting is locked while a crank cycle is active');
    events = [{ ...base(0), type: 'SETTING_CHANGED', valueBefore: state.settingValue, valueAfter: action.value, revisionBefore: state.settingRevision, revisionAfter: increment(state.settingRevision, 'setting revision'), humanBefore: state.humanOperationCount, humanAfter: increment(state.humanOperationCount, 'human operation count') }];
  } else if (action.type === 'BEGIN_CRANK_CYCLE') {
    if (state.phase !== 'HOME_FREE') throw new InvalidInterlockStateError('a crank cycle can begin only from the free home state');
    events = [
      { ...base(0), type: 'SETTING_LOCKED', settingLockedBefore: false, settingLockedAfter: true },
      { ...base(1), type: 'CRANK_RELEASED', crankLockedBefore: true, crankLockedAfter: false },
      { ...base(2), type: 'CRANK_CYCLE_BEGUN', positionBefore: 'HOME', positionAfter: 'ACTIVE', humanBefore: state.humanOperationCount, humanAfter: increment(state.humanOperationCount, 'human operation count') },
    ];
  } else if (action.type === 'COMPLETE_CRANK_CYCLE') {
    if (state.phase !== 'ACTIVE') throw new InvalidInterlockStateError('no active crank cycle to complete');
    events = [
      { ...base(0), type: 'CRANK_CYCLE_COMPLETED', cycleCountBefore: state.completedCycleCount, cycleCountAfter: increment(state.completedCycleCount, 'completed cycle count'), humanBefore: state.humanOperationCount, humanAfter: increment(state.humanOperationCount, 'human operation count') },
      { ...base(1), type: 'CRANK_RETURNED_HOME', positionBefore: 'ACTIVE', positionAfter: 'HOME' },
      { ...base(2), type: 'CRANK_LOCKED', crankLockedBefore: false, crankLockedAfter: true },
      { ...base(3), type: 'SETTING_RELEASED', settingLockedBefore: true, settingLockedAfter: false },
    ];
  } else {
    throw new InvalidInterlockStateError('unsupported setting-crank interlock action type');
  }
  return { state: events.reduce(reduceInterlockEvent, structuredClone(state)), events };
}

export function reduceInterlockEvent(
  state: Readonly<SettingCrankInterlockState>,
  event: Readonly<InterlockEvent>,
): SettingCrankInterlockState {
  assertInterlockInvariant(state);
  if (event.mechanismId !== state.mechanismId || !Number.isSafeInteger(event.sequence) || event.sequence < 0) throw new Error('invalid interlock event identity');
  let next: SettingCrankInterlockState;
  if (event.type === 'SETTING_CHANGED') {
    nonNegative(event.valueAfter, 'setting value');
    if (state.phase !== 'HOME_FREE' || event.valueBefore !== state.settingValue || event.revisionBefore !== state.settingRevision || event.revisionAfter !== increment(state.settingRevision, 'setting revision') || event.humanBefore !== state.humanOperationCount || event.humanAfter !== increment(state.humanOperationCount, 'human operation count')) throw new Error('invalid setting-change event');
    next = { ...state, settingValue: event.valueAfter, settingRevision: event.revisionAfter, humanOperationCount: event.humanAfter };
  } else if (event.type === 'SETTING_LOCKED') {
    if (state.phase !== 'HOME_FREE' || state.settingLocked !== event.settingLockedBefore || event.settingLockedAfter !== true) throw new Error('invalid setting-lock event');
    next = { ...state, settingLocked: true, phase: 'BEGIN_SETTING_LOCKED' };
  } else if (event.type === 'CRANK_RELEASED') {
    if (state.phase !== 'BEGIN_SETTING_LOCKED' || state.crankLocked !== event.crankLockedBefore || event.crankLockedAfter !== false) throw new Error('invalid crank-release event');
    next = { ...state, crankLocked: false, phase: 'BEGIN_CRANK_RELEASED' };
  } else if (event.type === 'CRANK_CYCLE_BEGUN') {
    if (state.phase !== 'BEGIN_CRANK_RELEASED' || state.crankPosition !== event.positionBefore || event.positionAfter !== 'ACTIVE' || event.humanBefore !== state.humanOperationCount || event.humanAfter !== increment(state.humanOperationCount, 'human operation count')) throw new Error('invalid cycle-begin event');
    next = { ...state, crankPosition: 'ACTIVE', phase: 'ACTIVE', humanOperationCount: event.humanAfter };
  } else if (event.type === 'CRANK_CYCLE_COMPLETED') {
    if (state.phase !== 'ACTIVE' || event.cycleCountBefore !== state.completedCycleCount || event.cycleCountAfter !== increment(state.completedCycleCount, 'completed cycle count') || event.humanBefore !== state.humanOperationCount || event.humanAfter !== increment(state.humanOperationCount, 'human operation count')) throw new Error('invalid cycle-completion event');
    next = { ...state, completedCycleCount: event.cycleCountAfter, humanOperationCount: event.humanAfter, phase: 'RETURNING' };
  } else if (event.type === 'CRANK_RETURNED_HOME') {
    if (state.phase !== 'RETURNING' || state.crankPosition !== event.positionBefore || event.positionAfter !== 'HOME') throw new Error('invalid crank-return event');
    next = { ...state, crankPosition: 'HOME', phase: 'RETURNED_HOME' };
  } else if (event.type === 'CRANK_LOCKED') {
    if (state.phase !== 'RETURNED_HOME' || state.crankLocked !== event.crankLockedBefore || event.crankLockedBefore !== false || event.crankLockedAfter !== true) throw new Error('invalid crank-lock event');
    next = { ...state, crankLocked: true, phase: 'RETURN_CRANK_LOCKED' };
  } else if (event.type === 'SETTING_RELEASED') {
    if (state.phase !== 'RETURN_CRANK_LOCKED' || state.settingLocked !== event.settingLockedBefore || event.settingLockedAfter !== false) throw new Error('invalid setting-release event');
    next = { ...state, settingLocked: false, phase: 'HOME_FREE' };
  } else {
    throw new Error('unsupported setting-crank interlock event type');
  }
  assertInterlockInvariant(next);
  return next;
}

function statesEqual(left: Readonly<SettingCrankInterlockState>, right: Readonly<SettingCrankInterlockState>): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

export function replayInterlock(trace: Readonly<InterlockTrace>): SettingCrankInterlockState {
  let expectedSequence = 0;
  const replayed = trace.events.reduce<SettingCrankInterlockState>((state, event) => {
    if (event.sequence !== expectedSequence) throw new Error('interlock event sequence is not contiguous');
    expectedSequence += 1;
    return reduceInterlockEvent(state, event);
  }, structuredClone(trace.initialState));
  if (!statesEqual(replayed, trace.finalState)) throw new Error('interlock replay final state mismatch');
  return replayed;
}

export function traceInterlockActions(initialState: Readonly<SettingCrankInterlockState>, actions: readonly InterlockAction[]): InterlockTrace {
  const start = structuredClone(initialState);
  let state = start;
  const events: InterlockEvent[] = [];
  for (const action of actions) {
    const result = transitionInterlock(state, action);
    const shifted = result.events.map((event) => ({ ...event, sequence: event.sequence + events.length } as InterlockEvent));
    state = shifted.reduce(reduceInterlockEvent, state);
    events.push(...shifted);
  }
  return { initialState: start, actions: structuredClone([...actions]), events, finalState: state };
}
