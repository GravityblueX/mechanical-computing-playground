export interface CarriageState { offset:number; }
export const createCarriage=(offset=0):CarriageState=>({offset});
export const shiftCarriage=(state:CarriageState, offset:number):CarriageState=>({offset:state.offset+offset});
export const placeValue=(digit:number, carriage:CarriageState)=>digit*10**carriage.offset;
