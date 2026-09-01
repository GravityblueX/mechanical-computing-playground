import { replayDifference, transitionDifference, type DifferenceCrank, type DifferenceState } from '../../mechanisms/difference-column';

export const DIFFERENCE_OUTPUT_FLOW_ID = 'difference-output-teaching-flow';

export interface DifferenceOutputState {
  mechanismId: typeof DIFFERENCE_OUTPUT_FLOW_ID;
  row: number;
  generatedValue: number;
  calculationReady: boolean;
  checkCopyValue: number | null;
  stereotypeMasterValue: number | null;
  eventIndex: number;
}
interface BaseEvent { mechanismId: typeof DIFFERENCE_OUTPUT_FLOW_ID; sequence: number; claimType: 'P/M'; }
export type DifferenceOutputEvent =
  | (BaseEvent & { type: 'TABLE_VALUE_READY'; row: number; value: number })
  | (BaseEvent & { type: 'CHECK_COPY_RECORDED'; row: number; value: number })
  | (BaseEvent & { type: 'STEREOTYPE_OUTPUT_ROLE_RECORDED'; row: number; value: number });
export interface DifferenceOutputTrace {
  sourceCrank: DifferenceCrank;
  initialState: DifferenceOutputState;
  events: DifferenceOutputEvent[];
  finalState: DifferenceOutputState;
}
export class InvalidDifferenceOutputError extends Error { constructor(message: string) { super(message); this.name = 'InvalidDifferenceOutputError'; } }

function validRow(value: number): void { if (!Number.isSafeInteger(value) || value < 0) throw new InvalidDifferenceOutputError('output row must be a non-negative safe integer'); }
function finite(value: number): void { if (!Number.isFinite(value)) throw new InvalidDifferenceOutputError('output value must be finite'); }

export function createDifferenceOutputState(row: number, value: number): DifferenceOutputState {
  validRow(row); finite(value);
  return { mechanismId: DIFFERENCE_OUTPUT_FLOW_ID, row, generatedValue: value, calculationReady: false, checkCopyValue: null, stereotypeMasterValue: null, eventIndex: 0 };
}

export function reduceDifferenceOutputEvent(state: Readonly<DifferenceOutputState>, event: Readonly<DifferenceOutputEvent>): DifferenceOutputState {
  if (state.mechanismId !== DIFFERENCE_OUTPUT_FLOW_ID || event.mechanismId !== state.mechanismId || event.sequence !== state.eventIndex || event.claimType !== 'P/M') throw new InvalidDifferenceOutputError('invalid output event identity or sequence');
  validRow(event.row); finite(event.value);
  if (event.row !== state.row || event.value !== state.generatedValue) throw new InvalidDifferenceOutputError('output event row/value mismatch');
  if (event.type === 'TABLE_VALUE_READY') {
    if (state.calculationReady || state.checkCopyValue !== null || state.stereotypeMasterValue !== null) throw new InvalidDifferenceOutputError('table value readiness is out of order');
    return { ...state, calculationReady: true, eventIndex: state.eventIndex + 1 };
  }
  if (event.type === 'CHECK_COPY_RECORDED') {
    if (!state.calculationReady || state.checkCopyValue !== null || state.stereotypeMasterValue !== null) throw new InvalidDifferenceOutputError('check-copy prerequisite failed');
    return { ...state, checkCopyValue: state.generatedValue, eventIndex: state.eventIndex + 1 };
  }
  if (event.type === 'STEREOTYPE_OUTPUT_ROLE_RECORDED') {
    if (!state.calculationReady || state.checkCopyValue !== state.generatedValue || state.stereotypeMasterValue !== null) throw new InvalidDifferenceOutputError('stereotype-role prerequisite failed');
    return { ...state, stereotypeMasterValue: state.generatedValue, eventIndex: state.eventIndex + 1 };
  }
  throw new InvalidDifferenceOutputError(`unknown output event: ${String((event as { type?: unknown }).type)}`);
}

export function createDifferenceOutputTrace(source: Readonly<DifferenceState>): DifferenceOutputTrace {
  const sourceCrank = transitionDifference(source);
  replayDifference(sourceCrank);
  const row = sourceCrank.after.row;
  const value = sourceCrank.after.output.at(-1);
  if (value === undefined) throw new InvalidDifferenceOutputError('difference crank produced no table value');
  const initialState = createDifferenceOutputState(row, value);
  const base = (sequence: number): BaseEvent => ({ mechanismId: DIFFERENCE_OUTPUT_FLOW_ID, sequence, claimType: 'P/M' });
  const events: DifferenceOutputEvent[] = [
    { ...base(0), type: 'TABLE_VALUE_READY', row, value },
    { ...base(1), type: 'CHECK_COPY_RECORDED', row, value },
    { ...base(2), type: 'STEREOTYPE_OUTPUT_ROLE_RECORDED', row, value },
  ];
  const finalState = events.reduce(reduceDifferenceOutputEvent, initialState);
  return { sourceCrank, initialState, events, finalState };
}

export function stateAtDifferenceOutputEvent(trace: Readonly<DifferenceOutputTrace>, count: number): DifferenceOutputState {
  if (!Number.isInteger(count) || count < 0 || count > trace.events.length) throw new InvalidDifferenceOutputError('output event index outside trace');
  const sourceAfter = replayDifference(trace.sourceCrank);
  if (sourceAfter.row !== trace.initialState.row || sourceAfter.output.at(-1) !== trace.initialState.generatedValue) throw new InvalidDifferenceOutputError('output trace no longer matches source calculation');
  return trace.events.slice(0, count).reduce(reduceDifferenceOutputEvent, structuredClone(trace.initialState));
}
export function replayDifferenceOutput(trace: Readonly<DifferenceOutputTrace>): DifferenceOutputState {
  const replayed = stateAtDifferenceOutputEvent(trace, trace.events.length);
  if (JSON.stringify(replayed) !== JSON.stringify(trace.finalState)) throw new InvalidDifferenceOutputError('output replay final state mismatch');
  return replayed;
}
