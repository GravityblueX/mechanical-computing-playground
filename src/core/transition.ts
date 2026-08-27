import type { MechanismEvent } from './events';
import type { ErrorCondition, WarningCondition } from './types';

export interface TransitionResult<State, Event extends MechanismEvent = MechanismEvent> {
  state: State;
  events: readonly Event[];
  warnings: readonly WarningCondition[];
  errors: readonly ErrorCondition[];
}

export type Transition<State, Action, Event extends MechanismEvent = MechanismEvent> = (
  state: Readonly<State>,
  action: Readonly<Action>,
) => TransitionResult<State, Event>;

export function applyEvents<State, Event extends MechanismEvent>(
  initialState: Readonly<State>,
  events: readonly Event[],
  reducer: (state: Readonly<State>, event: Readonly<Event>) => State,
): State {
  return events.reduce<State>((state, event) => reducer(state, event), structuredClone(initialState));
}
