import { describe, expect, it } from 'vitest';
import { createRevolutionCounter, crankRevolution, reduceRevolution } from '../src/mechanisms/revolution-counter';
import { createIntegrator, integrate } from '../src/mechanisms/continuous-integrator';
import { createPhaseMachine, runPhaseCycle, STAGE_A_PHASES } from '../src/backprop/core/phase-machine';
import { evaluate } from '../src/backprop/core/stage-a';

describe('shared mechanisms',()=>{
 it('counts and replays revolutions',()=>{const a=createRevolutionCounter(); const b=crankRevolution(a); expect(reduceRevolution(a,b.event)).toEqual(b.state);});
 it('integrates a constant shaft input',()=>{let s=createIntegrator(2,.5); for(let i=0;i<4;i++) s=integrate(s); expect(s.integratedQuantity).toBe(4);});
 it('runs the same explicit phase cycle',()=>{const m=runPhaseCycle(createPhaseMachine(evaluate({x1:2,x2:3,w1:0,w2:0,target:10,learningRate:.01}))); expect(m.events.map(e=>e.phase)).toEqual(STAGE_A_PHASES); expect(m.state.loss).toBeLessThan(50);});
});
