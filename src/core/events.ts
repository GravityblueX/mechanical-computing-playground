import type {
  HumanOperation,
  MechanismId,
  OperationCycleId,
  OperationPhase,
  SignedStep,
  WheelIdentity,
} from './types';

interface EventBase {
  mechanismId: MechanismId;
  cycleId: OperationCycleId;
  sequence: number;
  phase: OperationPhase;
}

export interface CrankBeginEvent extends EventBase {
  type: 'CRANK_BEGIN';
  phase: 'CRANK_BEGIN';
  operation: HumanOperation & { type: 'TURN_CRANK' };
}

export interface WheelStepEvent extends EventBase {
  type: 'WHEEL_STEP';
  phase: 'WHEEL_STEP';
  wheel: WheelIdentity;
  motion: SignedStep;
  from: number;
  to: number;
}

export interface CarryPendingEvent extends EventBase {
  type: 'CARRY_PENDING';
  phase: 'CARRY_PENDING';
  fromWheel: WheelIdentity;
  toWheel: WheelIdentity;
}

export interface CarryPropagatedEvent extends EventBase {
  type: 'CARRY_PROPAGATED';
  phase: 'CARRY_PROPAGATED';
  fromWheel: WheelIdentity;
  toWheel: WheelIdentity;
}

export interface CarryOutEvent extends EventBase {
  type: 'CARRY_OUT';
  phase: 'CARRY_OUT';
  fromWheel: WheelIdentity;
}

export interface CrankEndEvent extends EventBase {
  type: 'CRANK_END';
  phase: 'CRANK_END';
}

export type MechanismEvent =
  | CrankBeginEvent
  | WheelStepEvent
  | CarryPendingEvent
  | CarryPropagatedEvent
  | CarryOutEvent
  | CrankEndEvent;
