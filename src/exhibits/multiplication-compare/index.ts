import { pinwheel } from '../../mechanisms/pinwheel';
import { steppedDrum } from '../../mechanisms/stepped-drum';
export interface MultiplicationComparison { value:number; repeatedAddition:{cranks:number;shifts:number}; steppedDrum:ReturnType<typeof steppedDrum>[]; pinwheel:ReturnType<typeof pinwheel>[]; }
export const compare314x27=():MultiplicationComparison=>({value:314*27,repeatedAddition:{cranks:27,shifts:0},steppedDrum:[steppedDrum(7,0),steppedDrum(2,1)],pinwheel:[pinwheel(7,0),pinwheel(2,1)]});
