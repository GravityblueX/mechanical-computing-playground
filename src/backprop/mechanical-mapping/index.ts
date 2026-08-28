import type { StageAState } from '../core/stage-a';
export interface MechanicalMapping { inputDials: [number, number]; weightDials: [number, number]; accumulator: number; targetScale: number; errorShaft: number; gradientShafts: [number, number]; learningRateRatio: number; }
/** Grade-D pedagogical mapping: each value is directly derived from tested numerical state. */
export function mapStageA(state: Readonly<StageAState>): MechanicalMapping { return { inputDials:[state.x1,state.x2], weightDials:[state.w1,state.w2], accumulator:state.output, targetScale:state.target, errorShaft:state.output-state.target, gradientShafts:[state.gradients.w1,state.gradients.w2], learningRateRatio:state.learningRate }; }
