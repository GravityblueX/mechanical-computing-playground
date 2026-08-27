import { crankPlusOne, digitsToString } from './mechanism-core';

const result = crankPlusOne([9, 9, 0, 0]);
const message = document.querySelector('main p');
if (message) {
  message.textContent = `Visible carry core: ${digitsToString(result.before)} + 1 → ${digitsToString(result.after)}`;
}
