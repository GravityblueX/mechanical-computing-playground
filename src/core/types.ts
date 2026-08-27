export type MechanismId = string;
export type OperationCycleId = string;

export type OperationPhase =
  | 'CRANK_BEGIN'
  | 'WHEEL_STEP'
  | 'CARRY_PENDING'
  | 'CARRY_PROPAGATED'
  | 'CARRY_OUT'
  | 'CRANK_END';

export interface WheelIdentity {
  kind: 'wheel' | 'dial';
  id: string;
  /** Zero is the least-significant position. */
  index: number;
}

export interface WheelPosition {
  wheel: WheelIdentity;
  position: number;
}

export interface SignedStep {
  kind: 'step';
  amount: number;
}

export interface SignedRotation {
  kind: 'rotation';
  /** Signed turns; positive is the mechanism's forward direction. */
  turns: number;
}

export interface TransferRatio {
  numerator: number;
  denominator: number;
}

export interface CarriageOffset {
  decimalPlaces: number;
}

export type LatchDetentState =
  | { kind: 'latch'; engaged: boolean }
  | { kind: 'detent'; position: 'engaged' | 'released' };

export type HumanOperation =
  | { type: 'TURN_CRANK'; motion: SignedRotation }
  | { type: 'STEP_WHEEL'; wheel: WheelIdentity; motion: SignedStep }
  | { type: 'SET_DIAL'; dial: WheelIdentity; position: number }
  | { type: 'SHIFT_CARRIAGE'; offset: CarriageOffset }
  | { type: 'SET_LATCH'; state: LatchDetentState };

export interface MechanismWarning {
  severity: 'warning';
  code: string;
  message: string;
}

export interface OverflowCondition {
  severity: 'warning';
  code: 'OVERFLOW';
  message: string;
  wheel: WheelIdentity;
}

export interface MechanismError {
  severity: 'error';
  code: string;
  message: string;
}

export type WarningCondition = MechanismWarning | OverflowCondition;
export type ErrorCondition = MechanismError;
