export interface PinwheelOperation { mechanism:'pinwheel'; digit:number; crankCount:number; carriageShift:number; effectivePins:number; }
export const pinwheel=(digit:number, carriageShift:number):PinwheelOperation=>({mechanism:'pinwheel',digit,crankCount:1,carriageShift,effectivePins:digit});
