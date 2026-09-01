import { compare314x27, type MultiplicationPathSummary } from '../multiplication-compare';
import { accumulatorValue, createKeyDrivenAccumulator, createKeyStrokeTrace } from '../../mechanisms/key-driven-accumulator';
import { quotientValue, traceOperatorDivision } from '../../mechanisms/operator-division';
import { PRINTING_LEDGER_PRESET, tracePrintingLedger } from '../../mechanisms/printing-ledger';

export interface OperatorWorkText { en: string; zh: string; }
export type OperatorWorkScenarioId = 'multiplication-314x27' | 'key-driven-34' | 'division-8478-by-314' | 'printing-ledger-subtotal-total';
export type OperatorActionClass = 'selection' | 'repetition/cycle' | 'shift/place management' | 'correction' | 'output request' | 'arithmetic entry';

export interface ObservedActionCount {
  actionClass: OperatorActionClass;
  count: number;
  derivedFrom: string;
}

export interface MultiplicationPathWork {
  id: 'repeated-addition' | 'stepped-drum' | 'pinwheel' | 'direct-multiplication';
  operatorRepetitions: number;
  operationCycles: number;
  carriageShifts: number;
  multiplicationTableWork: string;
}

export interface OperatorWorkProfile {
  id: OperatorWorkScenarioId;
  title: OperatorWorkText;
  claimType: 'P/M';
  sourceAnchor: string;
  detailRoute: string;
  operatorResponsibilities: readonly OperatorWorkText[];
  machineResponsibilities: readonly OperatorWorkText[];
  persistentOutputResponsibility: OperatorWorkText | null;
  observedCounts: readonly ObservedActionCount[];
  notEstablished: readonly OperatorWorkText[];
  multiplicationPaths?: readonly MultiplicationPathWork[];
  outcome: OperatorWorkText;
}

function multiplicationPath(id: MultiplicationPathWork['id'], path: MultiplicationPathSummary): MultiplicationPathWork {
  return {
    id,
    operatorRepetitions: path.operatorRepetitions,
    operationCycles: path.operationCycles,
    carriageShifts: path.carriageShifts,
    multiplicationTableWork: path.multiplicationTableWork,
  };
}

function buildMultiplicationProfile(): OperatorWorkProfile {
  const comparison = compare314x27();
  const multiplicationPaths = [
    multiplicationPath('repeated-addition', comparison.paths.repeatedAddition),
    multiplicationPath('stepped-drum', comparison.paths.steppedDrum),
    multiplicationPath('pinwheel', comparison.paths.pinwheel),
    multiplicationPath('direct-multiplication', comparison.paths.directMultiplication),
  ] as const;
  const directEvents = comparison.directMultiplication.trace.events;
  return {
    id: 'multiplication-314x27',
    title: { en: '314 × 27: repetition or encoded multiple selection', zh: '314 × 27：重复操作还是编码倍数选择' },
    claimType: 'P/M',
    sourceAnchor: 'research/multiplication-mechanisms.md',
    detailRoute: '#/multiplication',
    operatorResponsibilities: [
      { en: 'set/select values and maintain decimal place', zh: '设定/选择数值并维护十进制位' },
      { en: 'supply repeated cycles in the repeated-addition, stepped-drum, and pinwheel teaching paths', zh: '在重复加法、阶梯鼓和拨轮教学路径中提供重复周期' },
    ],
    machineResponsibilities: [
      { en: 'accumulate place-valued contributions', zh: '累加带位值的贡献量' },
      { en: 'in the direct path, expose an encoded multiple selected by each multiplier digit', zh: '在直接乘法路径中，按乘数位选择并呈现编码倍数' },
    ],
    persistentOutputResponsibility: null,
    observedCounts: [
      { actionClass: 'selection', count: directEvents.filter(event => event.type === 'MULTIPLIER_DIGIT_SELECTED').length, derivedFrom: 'direct-multiplier MULTIPLIER_DIGIT_SELECTED events' },
      { actionClass: 'repetition/cycle', count: directEvents.filter(event => event.type === 'OPERATION_CYCLE').length, derivedFrom: 'direct-multiplier OPERATION_CYCLE events' },
      { actionClass: 'shift/place management', count: directEvents.filter(event => event.type === 'CARRIAGE_SHIFTED').length, derivedFrom: 'direct-multiplier CARRIAGE_SHIFTED events' },
    ],
    multiplicationPaths,
    outcome: { en: `all four P/M paths produce ${comparison.value}`, zh: `四条 P/M 路径都得到 ${comparison.value}` },
    notEstablished: [
      { en: 'historical time, productivity, fatigue, or universal workflow for any machine family', zh: '任何机器家族的历史耗时、生产率、疲劳程度或普遍工作流程' },
      { en: 'source-specific stepped-drum, pinwheel, or Millionaire control geometry', zh: '特定阶梯鼓、拨轮或 Millionaire 控制机构几何' },
    ],
  };
}

function buildKeyDrivenProfile(): OperatorWorkProfile {
  const tens = createKeyStrokeTrace(createKeyDrivenAccumulator(3), 1, 3, 'tens-3');
  const units = createKeyStrokeTrace(tens.finalState, 0, 4, 'units-4');
  const events = [...tens.events, ...units.events];
  return {
    id: 'key-driven-34',
    title: { en: 'Key-driven place-value entry: tens 3 + units 4', zh: '按键位值输入：十位 3 + 个位 4' },
    claimType: 'P/M', sourceAnchor: 'research/key-driven-computation.md', detailRoute: '#/about',
    operatorResponsibilities: [{ en: 'choose a decimal column and digit, then press that key', zh: '选择十进制列和数字，然后按下该键' }],
    machineResponsibilities: [{ en: 'turn each key stroke directly into a place-value contribution and accumulator transition', zh: '把每次按键直接变成位值贡献和累加器状态转换' }],
    persistentOutputResponsibility: null,
    observedCounts: [
      { actionClass: 'arithmetic entry', count: events.filter(event => event.type === 'KEY_STROKE_BEGIN').length, derivedFrom: 'key-driven KEY_STROKE_BEGIN events' },
      { actionClass: 'repetition/cycle', count: units.finalState.keyStrokeCount, derivedFrom: 'key-driven final state keyStrokeCount' },
    ],
    outcome: { en: `accumulator ${accumulatorValue(units.finalState)} after two key-stroke cycles; no separate crank event`, zh: `两次按键周期后累加器为 ${accumulatorValue(units.finalState)}；没有单独的曲柄事件` },
    notEstablished: [
      { en: 'Comptometer model-specific key geometry, simultaneous columns, correction, or historical timing', zh: '特定 Comptometer 型号的按键几何、多列同时动作、纠错或历史时序' },
      { en: 'operator speed, training, effort, or throughput', zh: '操作者速度、训练、用力或吞吐量' },
    ],
  };
}

function buildDivisionProfile(): OperatorWorkProfile {
  const trace = traceOperatorDivision(8478, 314, 1);
  const count = (type: typeof trace.events[number]['type']) => trace.events.filter(event => event.type === type).length;
  return {
    id: 'division-8478-by-314',
    title: { en: 'Operator division: 8478 ÷ 314', zh: '操作者除法：8478 ÷ 314' },
    claimType: 'P/M', sourceAnchor: 'research/subtraction-and-division.md', detailRoute: '#/division',
    operatorResponsibilities: [
      { en: 'request repeated subtraction, recognize the teaching trace overshoot, correct it, and shift place', zh: '请求重复减法、识别教学事件流中的越界、执行纠正并移位' },
      { en: 'decide when the remainder/quotient state permits completion', zh: '根据余数/商状态决定何时完成' },
    ],
    machineResponsibilities: [
      { en: 'maintain residual, divisor contribution, quotient digits, phase, and legal-action constraints', zh: '维护余数、除数贡献、商位、阶段和合法动作约束' },
    ],
    persistentOutputResponsibility: null,
    observedCounts: [
      { actionClass: 'repetition/cycle', count: count('SUBTRACT_ONCE'), derivedFrom: 'operator-division SUBTRACT_ONCE events' },
      { actionClass: 'correction', count: count('CORRECT_ADD_BACK'), derivedFrom: 'operator-division CORRECT_ADD_BACK events' },
      { actionClass: 'shift/place management', count: count('SHIFT_CARRIAGE_DOWN'), derivedFrom: 'operator-division SHIFT_CARRIAGE_DOWN events' },
      { actionClass: 'selection', count: count('OVERSHOOT_DETECTED'), derivedFrom: 'operator-division OVERSHOOT_DETECTED decision markers' },
    ],
    outcome: { en: `quotient ${quotientValue(trace.finalState)}, remainder ${trace.finalState.residual}`, zh: `商 ${quotientValue(trace.finalState)}，余数 ${trace.finalState.residual}` },
    notEstablished: [
      { en: 'a Thomas, Burkhardt, Curta, or pinwheel operator manual sequence', zh: 'Thomas、Burkhardt、Curta 或拨轮机器的操作手册步骤' },
      { en: 'historical crank/counter direction, automatic overshoot detection, or correction linkage', zh: '历史曲柄/计数器方向、自动越界检测或纠正连杆' },
    ],
  };
}

function buildPrintingProfile(): OperatorWorkProfile {
  const trace = tracePrintingLedger(PRINTING_LEDGER_PRESET);
  const itemCount = trace.events.filter(event => event.type === 'ITEM_RECORDED').length;
  const subtotal = trace.events.find(event => event.type === 'SUBTOTAL_RECORDED');
  const total = trace.events.find(event => event.type === 'TOTAL_RECORDED_AND_CLEARED');
  return {
    id: 'printing-ledger-subtotal-total',
    title: { en: 'Persistent output: items, subtotal, and total', zh: '持久输出：项目、小计和总计' },
    claimType: 'P/M', sourceAnchor: 'research/output-and-audit-trail.md', detailRoute: '#/output-contracts',
    operatorResponsibilities: [
      { en: 'enter three items and explicitly request subtotal and total outputs', zh: '录入三个项目，并明确请求小计和总计输出' },
    ],
    machineResponsibilities: [
      { en: 'accumulate items; retain working state after subtotal; clear working state after total', zh: '累加项目；小计后保留工作状态；总计后清除工作状态' },
    ],
    persistentOutputResponsibility: { en: 'preserve all ITEM/SUBTOTAL/TOTAL lines after the working accumulator is cleared', zh: '工作累加器清零后仍保留全部 ITEM/SUBTOTAL/TOTAL 行' },
    observedCounts: [
      { actionClass: 'arithmetic entry', count: itemCount, derivedFrom: 'printing-ledger ITEM_RECORDED events' },
      { actionClass: 'output request', count: trace.events.length - itemCount, derivedFrom: 'printing-ledger SUBTOTAL/TOTAL events' },
    ],
    outcome: { en: `${trace.finalState.printedLines.length} persistent lines; subtotal ${subtotal?.line.value} retained ${subtotal?.accumulatorAfter}; total ${total?.line.value} cleared to ${trace.finalState.accumulator}`, zh: `${trace.finalState.printedLines.length} 条持久记录；小计 ${subtotal?.line.value} 后保留 ${subtotal?.accumulatorAfter}；总计 ${total?.line.value} 后清零为 ${trace.finalState.accumulator}` },
    notEstablished: [
      { en: 'Burroughs key sequence, printer geometry, office procedure, time saved, or error-rate reduction', zh: 'Burroughs 按键顺序、打印几何、办公室流程、节省时间或错误率降低' },
      { en: 'universal subtotal/total behavior across production machines', zh: '所有量产机器通用的小计/总计行为' },
    ],
  };
}

export const OPERATOR_WORK_PROFILES: readonly OperatorWorkProfile[] = [
  buildMultiplicationProfile(), buildKeyDrivenProfile(), buildDivisionProfile(), buildPrintingProfile(),
];

export function getOperatorWorkProfile(id: OperatorWorkScenarioId): OperatorWorkProfile {
  const profile = OPERATOR_WORK_PROFILES.find(item => item.id === id);
  if (!profile) throw new Error(`unknown operator-work profile: ${id}`);
  return profile;
}
