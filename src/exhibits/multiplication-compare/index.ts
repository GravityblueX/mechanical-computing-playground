import { traceDirectMultiplication, type DirectMultiplicationTrace } from '../../mechanisms/direct-multiplier';
import { pinwheel } from '../../mechanisms/pinwheel';
import { steppedDrum } from '../../mechanisms/stepped-drum';

export interface MultiplicationPathSummary {
  finalResult: number;
  operatorRepetitions: number;
  operationCycles: number;
  carriageShifts: number;
  multiplicationTableWork: string;
  claimType: 'M/P' | 'P';
  evidenceLabel: string;
}

export interface MultiplicationComparison {
  value: number;
  repeatedAddition: MultiplicationPathSummary & { cranks: number; shifts: number };
  steppedDrum: ReturnType<typeof steppedDrum>[];
  pinwheel: ReturnType<typeof pinwheel>[];
  directMultiplication: MultiplicationPathSummary & { trace: DirectMultiplicationTrace };
  paths: {
    repeatedAddition: MultiplicationPathSummary;
    steppedDrum: MultiplicationPathSummary;
    pinwheel: MultiplicationPathSummary;
    directMultiplication: MultiplicationPathSummary;
  };
}

export const compare314x27 = (): MultiplicationComparison => {
  const multiplicand = 314;
  const multiplier = 27;
  const value = 8478;
  const steppedDrumOperations = [steppedDrum(7, 0), steppedDrum(2, 1)];
  const pinwheelOperations = [pinwheel(7, 0), pinwheel(2, 1)];
  const trace = traceDirectMultiplication(multiplicand, multiplier);

  const repeatedAddition: MultiplicationPathSummary & { cranks: number; shifts: number } = {
    finalResult: value,
    operatorRepetitions: 27,
    operationCycles: 27,
    carriageShifts: 0,
    multiplicationTableWork: 'operator repeats addition for the whole multiplier',
    claimType: 'M/P',
    evidenceLabel: 'arithmetic baseline; pedagogical operation model',
    cranks: 27,
    shifts: 0,
  };
  const steppedDrumSummary: MultiplicationPathSummary = {
    finalResult: value,
    operatorRepetitions: 9,
    operationCycles: 9,
    carriageShifts: 1,
    multiplicationTableWork: 'operator supplies repetition; stepped geometry encodes the set multiplicand digits',
    claimType: 'P',
    evidenceLabel: 'pedagogical functional model, not source-specific geometry',
  };
  const pinwheelSummary: MultiplicationPathSummary = {
    finalResult: value,
    operatorRepetitions: 9,
    operationCycles: 9,
    carriageShifts: 1,
    multiplicationTableWork: 'operator supplies repetition; active pins encode the set multiplicand digits',
    claimType: 'P',
    evidenceLabel: 'pedagogical functional model, not source-specific geometry',
  };
  const directSummary: MultiplicationPathSummary = {
    finalResult: trace.finalState.accumulator,
    operatorRepetitions: trace.finalState.operationCycleCount,
    operationCycles: trace.finalState.operationCycleCount,
    carriageShifts: trace.finalState.shiftCount,
    multiplicationTableWork: 'machine/control model selects a pre-encoded multiple for each multiplier digit',
    claimType: 'P',
    evidenceLabel: 'Steiger/Millionaire-informed functional model; no historical geometry claimed',
  };

  return {
    value,
    repeatedAddition,
    steppedDrum: steppedDrumOperations,
    pinwheel: pinwheelOperations,
    directMultiplication: { ...directSummary, trace },
    paths: {
      repeatedAddition,
      steppedDrum: steppedDrumSummary,
      pinwheel: pinwheelSummary,
      directMultiplication: directSummary,
    },
  };
};
