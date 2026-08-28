import type { StageAState } from '../core/stage-a';
export interface MechanicalMapping { outputShaft:number; errorDifferential:number; gradientShafts:{w1:number;w2:number}; learningRateRatio:number; evidenceGrade:'D'; }
export const mapStageA=(s:StageAState):MechanicalMapping=>({outputShaft:s.output,errorDifferential:s.output-s.target,gradientShafts:s.gradients,learningRateRatio:s.learningRate,evidenceGrade:'D'});
