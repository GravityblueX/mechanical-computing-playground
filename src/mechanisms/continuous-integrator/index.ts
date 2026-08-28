export interface IntegratorState { time:number; input:number; output:number; step:number; }
export function createIntegrator(input=1, step=0.1): IntegratorState { if(!Number.isFinite(input)||!Number.isFinite(step)||step<=0) throw new Error('invalid integrator parameters'); return {time:0,input,output:0,step}; }
export function integrate(state: Readonly<IntegratorState>, input=state.input): IntegratorState { return {...state,input,time:state.time+state.step,output:state.output+input*state.step}; }
