import { describe, expect, it } from 'vitest';
import { crankDifferenceCorrect, squarePreset, cubicPreset } from '../src/mechanisms/difference-column';
import { createCarriage, placeValue, shiftCarriage } from '../src/mechanisms/carriage-shift';
import { evaluate as evalA, update as updateA } from '../src/backprop/core/stage-a';
import { evaluate as evalB } from '../src/backprop/core/stage-b';

describe('difference mechanism', () => {
  it('generates square numbers by repeated addition', () => { let s=squarePreset(); for(let i=0;i<10;i++) s=crankDifferenceCorrect(s); expect(s.output).toEqual([0,1,4,9,16,25,36,49,64,81,100]); });
  it('generates cubes', () => { let s=cubicPreset(); for(let i=0;i<4;i++) s=crankDifferenceCorrect(s); expect(s.output).toEqual([0,1,8,27,64]); });
});
describe('carriage',()=>{it('moves a contribution by decimal places',()=>{const c=createCarriage(); expect(placeValue(3,c)).toBe(3); expect(placeValue(3,shiftCarriage(c,2))).toBe(300);});});
describe('stage A backprop',()=>{it('matches analytic reference and lowers loss',()=>{let s=evalA({x1:2,x2:3,w1:0,w2:0,target:10,learningRate:.01}); const before=s.loss; expect(s.gradients).toEqual({w1:-20,w2:-30}); s=updateA(s); expect(s.loss).toBeLessThan(before);});});
describe('stage B chain rule',()=>{it('exposes hidden adjoints',()=>{const s=evalB({x1:1,x2:2,w11:1,w12:0,w21:0,w22:1,v1:1,v2:1,target:5,learningRate:.01}); expect(s.output).toBe(3); expect(s.gradients.dLdy).toBe(-2); expect(s.gradients.dh1).toBe(-2); expect(s.gradients.dh2).toBe(-2);});});

describe('learning-rate behavior',()=>{
  it('stable and excessive rates are reproducible',()=>{
    let stable=evalA({x1:1,x2:1,w1:0,w2:0,target:1,learningRate:.1}); const stableStart=stable.loss;
    for(let i=0;i<8;i++) stable=updateA(stable);
    let aggressive=evalA({x1:1,x2:1,w1:0,w2:0,target:1,learningRate:1.1});
    for(let i=0;i<3;i++) aggressive=updateA(aggressive);
    expect(stable.loss).toBeLessThan(stableStart);
    expect(aggressive.loss).toBeGreaterThan(stableStart);
  });
});
