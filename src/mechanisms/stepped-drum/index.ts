export interface SteppedDrumOperation { mechanism:'stepped-drum'; digit:number; crankCount:number; carriageShift:number; effectiveSteps:number; }
export const steppedDrum=(digit:number, carriageShift:number):SteppedDrumOperation=>({mechanism:'stepped-drum',digit,crankCount:digit,carriageShift,effectiveSteps:digit});
