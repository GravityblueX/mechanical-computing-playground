import { createKeyDrivenAccumulator, InvalidKeyDrivenStateError } from '../../mechanisms/key-driven-accumulator';
import {
  createKeyStrokeIntegrity,
  InvalidKeyStrokeIntegrityError,
  reduceKeyStrokeIntegrityEvent,
  replayKeyStrokeIntegrity,
  traceKeyStrokeIntegrity,
  transitionKeyStrokeIntegrity,
  type IntegrityAction,
  type KeyStrokeIntegrityState,
  type KeyStrokeIntegrityTrace,
} from '../../mechanisms/key-stroke-integrity';

export type WorkbenchAction =
  | { type: 'BEGIN_KEY_STROKE'; column: number; digit: number }
  | { type: Exclude<IntegrityAction['type'], 'BEGIN_KEY_STROKE'> };

export type WorkbenchRejection = 'input-blocked' | 'finish-first' | 'already-committed' | 'out-of-order' | 'overflow' | 'invalid-key' | 'replay-only';
export type WorkbenchFeedback =
  | { kind: 'accepted'; actionType: IntegrityAction['type'] }
  | { kind: 'rejected'; reason: WorkbenchRejection };

export interface KeyStrokeWorkbench {
  trace: KeyStrokeIntegrityTrace;
  /** Null means the current action boundary; a number selects a read-only event prefix. */
  replayIndex: number | null;
  feedback: WorkbenchFeedback | null;
}

export function createKeyStrokeWorkbench(initialValue: 0 | 99 = 0): KeyStrokeWorkbench {
  const initial = createKeyStrokeIntegrity(createKeyDrivenAccumulator(3, initialValue));
  return { trace: traceKeyStrokeIntegrity(initial, []), replayIndex: null, feedback: null };
}

function rejectionReason(error: Error, state: Readonly<KeyStrokeIntegrityState>): WorkbenchRejection {
  if (error.message === 'keypress would overflow register width') return 'overflow';
  if (error.message === 'cannot begin this key stroke') return state.phase === 'IDLE' ? 'invalid-key' : 'input-blocked';
  if (error.message === 'error lock can be released only after correction' && state.phase === 'ERROR_LOCKED') return 'finish-first';
  if (error.message === 'stroke completion is out of order' && state.phase === 'CORRECTED_LOCKED') return 'already-committed';
  return 'out-of-order';
}

/** Only the existing mechanism decides whether an attempted operation is valid. */
export function applyWorkbenchAction(workbench: Readonly<KeyStrokeWorkbench>, request: Readonly<WorkbenchAction>): KeyStrokeWorkbench {
  if (workbench.replayIndex !== null) return { ...workbench, feedback: { kind: 'rejected', reason: 'replay-only' } };
  const action: IntegrityAction = { ...request, cycleId: `workbench-${workbench.trace.actions.length}` };
  try {
    const result = transitionKeyStrokeIntegrity(workbench.trace.finalState, action);
    const events = result.events.map(event => ({ ...event, sequence: event.sequence + workbench.trace.events.length }));
    return {
      trace: {
        initialState: workbench.trace.initialState,
        actions: [...workbench.trace.actions, action],
        events: [...workbench.trace.events, ...events],
        finalState: result.state,
      },
      replayIndex: null,
      feedback: { kind: 'accepted', actionType: action.type },
    };
  } catch (error) {
    if (!(error instanceof InvalidKeyStrokeIntegrityError || error instanceof InvalidKeyDrivenStateError)) throw error;
    // A rejected attempt is lesson feedback, never a successful mechanism action/event.
    return { ...workbench, feedback: { kind: 'rejected', reason: rejectionReason(error, workbench.trace.finalState) } };
  }
}

export function startWorkbenchReplay(workbench: Readonly<KeyStrokeWorkbench>): KeyStrokeWorkbench {
  replayKeyStrokeIntegrity(workbench.trace);
  return { ...workbench, replayIndex: 0, feedback: null };
}

export function stepWorkbenchReplay(workbench: Readonly<KeyStrokeWorkbench>): KeyStrokeWorkbench {
  if (workbench.replayIndex === null) return { ...workbench };
  return { ...workbench, replayIndex: Math.min(workbench.replayIndex + 1, workbench.trace.events.length), feedback: null };
}

export function returnToCurrentWorkbench(workbench: Readonly<KeyStrokeWorkbench>): KeyStrokeWorkbench {
  return { ...workbench, replayIndex: null, feedback: null };
}

export function displayedWorkbenchState(workbench: Readonly<KeyStrokeWorkbench>): KeyStrokeIntegrityState {
  if (workbench.replayIndex === null) return structuredClone(workbench.trace.finalState);
  return workbench.trace.events.slice(0, workbench.replayIndex).reduce(reduceKeyStrokeIntegrityEvent, structuredClone(workbench.trace.initialState));
}
